import { Component, Input, OnInit } from '@angular/core';
import { SMSourceDto } from 'src/api/rest/api';
import { SmYandexAuthService } from 'src/app/integration-google/services/sm-yandex-auth.service';

@Component({
	selector: 'sm-yd-source',
	templateUrl: './yd-source.component.html',
	styleUrls: [ './yd-source.component.scss' ]
})
export class YdSourceComponent implements OnInit {
	constructor(private readonly yandexAuthService: SmYandexAuthService) {}

	isLoading: boolean;

	@Input() id: number;
	source: SMSourceDto;

	ngOnInit(): void {
		if (!this.yandexAuthService.isSignedInYandex) this.yandexAuthService.authorize();
	}
}
