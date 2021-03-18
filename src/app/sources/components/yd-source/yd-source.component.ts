import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SMSourceDto, YandexDirectApiService, YDMetadataDto } from 'src/api/rest/api';
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
	sourceMetadata = {
		startDate: '',
		endDate: ''
	}

	metadata: YDMetadataDto;

	selectedClientId: string;
	selectedMetricIds: string[];

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
