import { Component, Input, OnInit } from '@angular/core';
import { SMSourceDto, YandexDirectApiService } from 'src/api/rest/api';
import { SmYandexAuthService } from 'src/app/integration/services/sm-yandex-auth.service';

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

	ngOnInit(): void {
		if (!this.yandexAuthService.isSignedInYandex) this.yandexAuthService.authorize();

		this.yandexDirectApiService.apiYandexDirectMetadataGet().subscribe((response) => {
			console.log(response);
		});
	}
}
