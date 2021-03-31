import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SMSourceDto, SMSourceFilter, YandexDirectApiService, YDMetadataDto, YDSourceMetadataDto } from 'src/api/rest/api';
import { SmYandexAuthService } from 'src/app/integration/services/sm-yandex-auth.service';
import { Options } from 'select2';
import * as _moment from 'moment';
import { SourceFilterComponent } from '../source-filter/source-filter.component';

@Component({
	selector: 'sm-yd-source',
	templateUrl: './yd-source.component.html',
	styleUrls: [ './yd-source.component.scss' ]
})
export class YdSourceComponent implements OnInit {
	constructor(
		private readonly yandexAuthService: SmYandexAuthService,
		private readonly yandexDirectApiService: YandexDirectApiService
	) {}

	isLoading: boolean;

	@Input() id: number;
	source: SMSourceDto;
	sourceMetadata: YDSourceMetadataDto = {
		startDate: '',
		endDate: '',
		selectedClientId: '',
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
	@ViewChild('filtersComponent') filtersComponent: SourceFilterComponent;

	ngOnInit(): void {
		this.isLoading = true;
		if (!this.yandexAuthService.isSignedInYandex) this.yandexAuthService.authorize();

		this.yandexDirectApiService.apiYandexDirectMetadataGet().subscribe((response) => {
			this.metadata = response;
			this.filterOptions = this.getFilterOptions();
			this.isLoading = false;
		});

		setInterval(() => {
			console.log(this.sourceMetadata.filters)
		}, 2000)
	}

	onFiltersChange(filters: SMSourceFilter[]) {
		this.sourceMetadata.filters = filters;
	}

	processData(): void {
		console.log(this.sourceMetadata);

		const filters = this.filtersComponent.model;
		this.sourceMetadata.selectedClientId = this.sourceMetadata.selectedClientId.toString();
		this.sourceMetadata.filters;

		this.yandexDirectApiService
			.apiYandexDirectReportPost({
				id: this.id,
				//reportRequestDto: {endDate: '', fieldNames: [], filters: [], startDate: '' },
				metadata: this.sourceMetadata
			})
			.subscribe((res) => {
				console.log(res);
			});
	}

	private getFilterOptions(): string[] {
		let result: string[] = [];
		this.metadata.filters.forEach((x) => {
			result.push(x.name);
		});
		return result;
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
