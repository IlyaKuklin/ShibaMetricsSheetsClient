import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
	AccountSummary,
	GADimensionGroupingDto,
	GAMetadataDto,
	GAMetricGroupingDto,
	ProfileSummary,
	WebPropertySummary
} from 'src/api/rest/api';
import { GoogleAnalyticsApiService } from 'src/api/rest/api/api/google-analytics.service';
import { SmGoogleAuthService } from 'src/app/integration-google/services/sm-google-auth.service';
import { Options } from 'select2';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'sm-ga-source',
	templateUrl: './ga-source.component.html',
	styleUrls: [ './ga-source.component.scss' ]
})
export class GaSourceComponent implements OnInit {
	constructor(
		private readonly googleAuthService: SmGoogleAuthService,
		private readonly googleAnalyticsApiService: GoogleAnalyticsApiService
	) {
		if (!this.googleAuthService.isUserSignedIn()) {
			this.googleAuthService.signIn();
		}
	}

	isLoading: boolean;

	metadata: GAMetadataDto;
	gaMetrics: GAMetricGroupingDto[];
	gaDimensions: GADimensionGroupingDto[];

	summaries: AccountSummary[];
	selectedSummaryId: string;

	properties: WebPropertySummary[];
	selectedPropertyId: string;

	profiles: ProfileSummary[];
	selectedProfileId: string;

	datesRange: FormGroup = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});

	selectedMetricIds: string[];
	selectedDimensionIds: string[] = [];

	splitByDay: boolean;

	s2_options: Options;

	ngOnInit(): void {
		this.isLoading = true;
		this.googleAnalyticsApiService.apiGoogleAnalyticsMetadataGet().subscribe((response: GAMetadataDto) => {
			this.metadata = response;
			this.summaries = this.metadata.accountSummaries.items;
			this.gaMetrics = this.metadata.metricGroupings;
			this.gaDimensions = this.metadata.dimensionGroupings;
			this.isLoading = false;
		});
		this.s2_options = new S2Options().s2_options;
	}

	onSummaryChange() {
		const summary = this.summaries.find((x) => x.id === this.selectedSummaryId);
		if (summary) {
			this.properties = summary.webProperties;
			this.selectedPropertyId = this.properties[0].id;
		} else {
			this.selectedPropertyId = null;
		}
		this.onPropertyChange();
	}

	onPropertyChange() {
		const property = this.properties.find((x) => x.id === this.selectedPropertyId);
		if (property) {
			this.profiles = property.profiles;
			this.selectedProfileId = this.profiles[0].id;
		} else {
			this.selectedProfileId = null;
		}
		this.onProfileChange();
	}

	onProfileChange() {}

	onSplitByDayChange($event: MatCheckboxChange) {
		this.splitByDay = $event.checked;
		if (this.splitByDay && this.selectedDimensionIds.indexOf('ga:date') == -1) {
			this.selectedDimensionIds.push('ga:date');
			this.selectedDimensionIds = [ ...this.selectedDimensionIds ];
		} else this.selectedDimensionIds = this.selectedDimensionIds.filter((x) => x !== 'ga:date');
	}

	onDimensionsChange($event: string[]) {
		this.splitByDay = $event.find((x) => x == 'ga:date') != null;
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
