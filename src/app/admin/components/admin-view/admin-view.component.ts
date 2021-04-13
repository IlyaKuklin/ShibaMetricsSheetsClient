import { Component, OnInit } from '@angular/core';
import { AdminApiService, YandexDirectApiService } from 'src/api/rest/api';
import { SmGoogleAuthService } from 'src/app/integration/services/sm-google-auth.service';
import { SmYandexAuthService } from 'src/app/integration/services/sm-yandex-auth.service';

@Component({
	selector: 'sm-admin-view',
	templateUrl: './admin-view.component.html',
	styleUrls: [ './admin-view.component.scss' ]
})
export class AdminViewComponent implements OnInit {
	constructor(
		private readonly adminApiService: AdminApiService,
		private readonly ydApiService: YandexDirectApiService,
		private readonly yandexAuthService: SmYandexAuthService,
		private readonly googleAuthService: SmGoogleAuthService
	) {}

	ngOnInit(): void {}

	updateGaColumns(): void {
		var token = this.googleAuthService.getTokenByAccount('Ilya Kuklin');
		this.adminApiService.apiAdminGaMetadataPatch(token).subscribe();
	}

	updateCampaigns() {
		this.ydApiService.apiYandexDirectCampaingsPatch().subscribe((response) => console.log(response));
	}

	updateClients() {
		this.ydApiService.apiYandexDirectClientsPatch().subscribe((response) => console.log(response));
	}

	testServiceAcc() {
		this.adminApiService.apiAdminSheetsTestPost().subscribe((res) => console.log(res));
	}

	test() {
		this.adminApiService.apiAdminTestGet(9).subscribe((res) => console.log(res));
	}
}
