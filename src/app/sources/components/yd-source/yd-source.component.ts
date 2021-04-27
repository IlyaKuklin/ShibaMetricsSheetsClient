import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
	SMSourceDto,
	SMSourceFilter,
	SourcesApiService,
	YandexDirectApiService,
	YDMetadataDto,
	YDSourceMetadataDto
} from 'src/api/rest/api';
import { SmYandexAuthService } from 'src/app/integration/services/sm-yandex-auth.service';
import { Options } from 'select2';
import * as _moment from 'moment';
import { SourceFilterComponent } from '../source-filter/source-filter.component';
import { forkJoin } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
	selector: 'sm-yd-source',
	templateUrl: './yd-source.component.html',
	styleUrls: [ './yd-source.component.scss' ]
})
export class YdSourceComponent implements OnInit {
	constructor(
		private readonly yandexAuthService: SmYandexAuthService,
		private readonly yandexDirectApiService: YandexDirectApiService,
		private readonly sourcesApiService: SourcesApiService,
		private readonly snackBarService: SnackbarService
	) {}

	isLoading: boolean;

	@Input() id: number;
	source: SMSourceDto;
	sourceMetadata: YDSourceMetadataDto = {
		startDate: '',
		endDate: '',
		selectedClientId: 0,
		selectedMetricIds: [],
		filters: []
	};

	metadata: YDMetadataDto;

	datesRange: FormGroup = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});

	s2_options: Options = new S2Options().s2_options;

	filterOptions: string[];

	ngOnInit(): void {
		this.isLoading = true;
		if (!this.yandexAuthService.isSignedInYandex) this.yandexAuthService.authorize();

		forkJoin([
			this.yandexDirectApiService.apiYandexDirectMetadataGet(),
			this.sourcesApiService.apiSourcesGet(this.id)
		]).subscribe((response: [YDMetadataDto, SMSourceDto]) => {
			this.metadata = response[0];
			this.filterOptions = this.getFilterOptions();
			this.source = response[1];
			if (this.source.rawMetadata) {
				this.sourceMetadata = JSON.parse(this.source.rawMetadata, this.camelCaseReviver);

				// todo: разобраться с парсингом
				var temp = this.sourceMetadata.selectedClientId as any;
				temp = Number.parseInt(temp);
				this.sourceMetadata.selectedClientId = temp;
			}

			setInterval(() => {}, 1000);

			this.isLoading = false;
		});
	}

	onFiltersChange(filters: SMSourceFilter[]) {
		this.sourceMetadata.filters = filters;
	}

	processData(): void {
		//this.sourceMetadata.selectedClientId = this.sourceMetadata.selectedClientId.toString();
		this.sourceMetadata.startDate = _moment(this.datesRange.controls['start'].value).format('YYYY-MM-DD');
		this.sourceMetadata.endDate = _moment(this.datesRange.controls['end'].value).format('YYYY-MM-DD');

		this.yandexDirectApiService
			.apiYandexDirectReportPost({
				id: this.id,
				metadata: this.sourceMetadata
			})
			.subscribe((res) => {
				this.snackBarService.show({
					duration: 1000,
					message: 'Таблица Google Sheets обновлена'
				});
			});
	}

	private getFilterOptions(): string[] {
		let result: string[] = [];
		this.metadata.filters.forEach((x) => {
			result.push(x.name);
		});
		return result;
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
		return state.name;
	};

	s2_templateResult = (state: any): any | string => {
		return state.name;
	};

	s2_matcher = (term: string, text: string, option: any) => {
		if (!option.name) return false;
		term = term.toLowerCase();
		let searchable = option.name.toLowerCase();
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

// interface IYDSourceMetadata {
// 	startDate: string;
// 	endDate: string;
// 	selectedClientId: string;
// 	selectedMetricIds: string[];

// 	//filters: SMReportFilter[];
// }
