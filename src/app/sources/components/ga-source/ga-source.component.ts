import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GoogleAnalyticsApiService } from 'src/api/rest/api/api/google-analytics.service';
import { SmGoogleAuthService } from 'src/app/integration/services/sm-google-auth.service';
import { Options } from 'select2';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
	GAMetadataDto,
	GAMetricGroupingDto,
	GADimensionGroupingDto,
	AccountSummary,
	WebPropertySummary,
	ProfileSummary,
	GAReportRequest,
	GAMetric,
	GADimension,
	GASourceMetadataDto,
	SourcesApiService,
	SMSourceDto,
	SMSourceFilter,
	SMSourceFilterOperator
} from 'src/api/rest/api';
import * as _moment from 'moment';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { forkJoin } from 'rxjs';
import { IFilterOption } from '../source-filter/source-filter.component';

@Component({
	selector: 'sm-ga-source',
	templateUrl: './ga-source.component.html',
	styleUrls: [ './ga-source.component.scss' ]
})
export class GaSourceComponent implements OnInit {
	constructor(
		private readonly googleAuthService: SmGoogleAuthService,
		private readonly googleAnalyticsApiService: GoogleAnalyticsApiService,
		private readonly sourcesApiService: SourcesApiService,
		private readonly snackBarService: SnackbarService
	) {}

	isLoading: boolean;

	@Input() id: number;
	source: SMSourceDto;
	sourceMetadata: GASourceMetadataDto = {
		startDate: '',
		endDate: '',
		selectedAccountId: '',
		selectedSummaryId: '',
		selectedPropertyId: '',
		selectedProfileId: '',
		selectedMetricIds: [],
		selectedDimensionIds: [],
		filters: []
	};

	get accounts(): string[] {
		return this.googleAuthService.getSignedInAccountNames();
	}

	metadata: GAMetadataDto;
	gaMetrics: GAMetricGroupingDto[];
	gaDimensions: GADimensionGroupingDto[];

	summaries: AccountSummary[] = [];

	get properties(): WebPropertySummary[] {
		const summary = this.summaries.find((x) => x.id === this.sourceMetadata.selectedSummaryId);
		if (summary) {
			return summary.webProperties;
		} else {
			return [];
		}
	}

	get profiles(): ProfileSummary[] {
		const property = this.properties.find((x) => x.id === this.sourceMetadata.selectedPropertyId);
		if (property) {
			return property.profiles;
		} else {
			return [];
		}
	}

	datesRange: FormGroup = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});

	splitByDay: boolean;

	s2_options: Options;

	filterOptions: IFilterOption[];

	ngOnInit(): void {
		this.sourcesApiService.apiSourcesGet(this.id).subscribe((source) => {
			this.source = source;
			if (this.source.rawMetadata) {
				this.sourceMetadata = JSON.parse(this.source.rawMetadata, this.camelCaseReviver);
				if (this.sourceMetadata.selectedDimensionIds.indexOf('ga:date') > -1) this.splitByDay = true;

				// TODO: костыль для перечисления фильтров.
				var keys = Object.keys(SMSourceFilterOperator).map((key) => SMSourceFilterOperator[key]);
				this.sourceMetadata.filters.forEach((filter) => {
					filter.operator = keys[filter.operator];
				});

				//this.getDataFromServer();
				this.onAccountChange();
			}
		});
	}

	private getDataFromServer() {
		const token = this.googleAuthService.getTokenByAccount(this.sourceMetadata.selectedAccountId);

		this.googleAnalyticsApiService.apiGoogleAnalyticsMetadataGet(token).subscribe((response: GAMetadataDto) => {
			this.metadata = response;
			this.summaries = this.metadata.accountSummaries.items;
			this.gaMetrics = this.metadata.metricGroupings;
			this.gaDimensions = this.metadata.dimensionGroupings;
			this.filterOptions = this.getFilterOptions();

			this.isLoading = false;
		});

		this.s2_options = new S2Options().s2_options;
	}

	addGoogleAccount(): void {
		this.googleAuthService.signIn();
	}

	onAccountChange() {
		//this.isLoading = true;

		if (!this.sourceMetadata.selectedAccountId) return;

		let authorized = false;
		if (!this.googleAuthService.isUserSignedIn(this.sourceMetadata.selectedAccountId)) {
			this.googleAuthService.flow.subscribe(() => {
				authorized = true;
				this.googleAuthService.flow.unsubscribe();
			});
			this.googleAuthService.signIn();
			const interval = setInterval(() => {
				if (authorized) {
					this.getDataFromServer();
					clearInterval(interval);
				}
			}, 1000);
		} else this.getDataFromServer();
	}

	onSummaryChange() {
		this.sourceMetadata.selectedPropertyId = '';
		this.sourceMetadata.selectedProfileId = '';
	}

	onPropertyChange() {
		this.sourceMetadata.selectedProfileId = '';
	}

	onProfileChange() {}

	onSplitByDayChange($event: MatCheckboxChange) {
		this.splitByDay = $event.checked;
		if (this.splitByDay && this.sourceMetadata.selectedDimensionIds.indexOf('ga:date') == -1) {
			this.sourceMetadata.selectedDimensionIds.push('ga:date');
			this.sourceMetadata.selectedDimensionIds = [ ...this.sourceMetadata.selectedDimensionIds ];
		} else
			this.sourceMetadata.selectedDimensionIds = this.sourceMetadata.selectedDimensionIds.filter(
				(x) => x !== 'ga:date'
			);
	}

	onDimensionsChange($event: string[]) {
		this.splitByDay = $event.find((x) => x == 'ga:date') != null;
	}

	onFiltersChange(filters: SMSourceFilter[]) {
		this.sourceMetadata.filters = filters;
	}

	processData(): void {
		const token = this.googleAuthService.getTokenByAccount(this.sourceMetadata.selectedAccountId);

		this.sourceMetadata.startDate = this.datesRange.controls['start'].value;
		this.sourceMetadata.endDate = this.datesRange.controls['end'].value;

		const gaMetrics = this.sourceMetadata.selectedMetricIds.map((x) => {
			return {
				expression: x,
				formattingType: 'METRIC_TYPE_UNSPECIFIED'
			} as GAMetric;
		});
		const gaDimensions = this.sourceMetadata.selectedDimensionIds.map((x) => {
			return {
				name: x
			} as GADimension;
		});

		const filterExpression = this.getFilterExpression();

		const reportRequests: GAReportRequest[] = [
			{
				viewId: this.sourceMetadata.selectedProfileId,
				dateRanges: [
					{
						startDate: _moment(this.sourceMetadata.startDate).format('YYYY-MM-DD'),
						endDate: _moment(this.sourceMetadata.endDate).format('YYYY-MM-DD')
					}
				],
				metrics: gaMetrics,
				dimensions: gaDimensions,
				filtersExpression: filterExpression
			}
		];
		reportRequests[0].includeEmptyRows = true;

		this.googleAnalyticsApiService
			.apiGoogleAnalyticsReportPost({
				id: this.id,
				reportRequests: reportRequests,
				metadata: this.sourceMetadata,
				token: token
			})
			.subscribe((response) => {
				this.snackBarService.show({
					duration: 1000,
					message: 'Таблица Google Sheets обновлена'
				});
			});
	}

	private getFilterOptions(): IFilterOption[] {
		let result: IFilterOption[] = [];
		this.gaMetrics.forEach((x) => {
			x.children.forEach((c) => {
				result.push({
					id: c.id,
					value: `${c.uiName} (${c.id})`
				});
			});
		});

		this.gaDimensions.forEach((x) => {
			x.children.forEach((c) => {
				result.push({
					id: c.id,
					value: `${c.uiName} (${c.id})`
				});
			});
		});

		result.sort((a, b) => {
			return a.value > b.value ? 1 : -1;
		});
		return result;
	}

	private getFilterExpression(): string {
		let expressionParts: string[] = [];
		this.sourceMetadata.filters.forEach((f) => {
			expressionParts.push(`${f.name}${getOperator(f.operator)}${f.values}`);
		});

		// TODO: поддержка ИЛИ.
		const result = expressionParts.join(';');
		return result;

		// TODO: поддержка >=, <= и dimension filters.
		function getOperator(enumOperator: SMSourceFilterOperator) {
			switch (enumOperator) {
				case SMSourceFilterOperator.Equals:
					return '==';
				case SMSourceFilterOperator.NotEquals:
					return '!=';
				case SMSourceFilterOperator.GreaterThan:
					return '>';
				case SMSourceFilterOperator.LessThan:
					return '<';
			}
		}
	}

	camelCaseReviver(key, value) {
		if (value && typeof value === 'object') {
			for (var k in value) {
				if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
					value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
					delete value[k];
				}
			}
		}
		return value;
	}
}

class S2Options {
	s2_templateSelection = (state: any): any | string => {
		return state.uiName;
	};

	s2_templateResult = (state: any): any | string => {
		return state.uiName;
	};

	s2_matcher = (term: string, text: string, option: any) => {
		if (!option.uiName) return false;
		term = term.toLowerCase();
		let searchable = option.uiName.toLowerCase();
		if (searchable.indexOf(term) >= 0) return true;
		return false;
	};

	s2_options: Options = {
		width: '100%',
		multiple: true,
		tags: true,
		templateSelection: this.s2_templateSelection,
		templateResult: this.s2_templateResult,
		matcher: this.s2_matcher
	};
}
