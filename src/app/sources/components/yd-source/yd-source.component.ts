import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SMSourceDto, YandexDirectApiService, YDMetadataDto, YDSourceMetadataDto } from 'src/api/rest/api';
import { SmYandexAuthService } from 'src/app/integration/services/sm-yandex-auth.service';
import { Options } from 'select2';
import * as _moment from 'moment';

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
		selectedMetricIds: []
	};

	metadata: YDMetadataDto;

	datesRange: FormGroup = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});

	s2_options: Options = new S2Options().s2_options;

	ngOnInit(): void {
		this.isLoading = true;
		if (!this.yandexAuthService.isSignedInYandex) this.yandexAuthService.authorize();

		this.yandexDirectApiService.apiYandexDirectMetadataGet().subscribe((response) => {
			this.metadata = response;

			this.isLoading = false;
		});
	}

	processData(): void {

		console.log(this.sourceMetadata);

		this.yandexDirectApiService
			.apiYandexDirectReportPost({
				id: this.id,
				//reportRequestDto: {endDate: '', fieldNames: [], filters: [], startDate: '' },
				metadata: {
					endDate: _moment(this.sourceMetadata.endDate).format('YYYY-MM-DD'),
					startDate: _moment(this.sourceMetadata.startDate).format('YYYY-MM-DD'),
					selectedClientId: this.sourceMetadata.selectedClientId.toString(),
					selectedMetricIds: this.sourceMetadata.selectedMetricIds
				}
			})
			.subscribe((res) => {
				console.log(res);
			});
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
