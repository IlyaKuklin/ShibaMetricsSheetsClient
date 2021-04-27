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
		window.localStorage['yandexFlow'] = '1';
		this.yandexAuthService.authorize();
		const interval = setInterval(() => {
			if (window.localStorage['yandexFlow'] == '0') {
				let accs = this.yandexAuthService.getSignedInAccountNames();
				let acc = accs[accs.length - 1];
				let token = this.yandexAuthService.getTokenByAccount(acc);
				this.ydApiService.apiYandexDirectClientsPatch(token, acc).subscribe((response) => console.log(response));
				clearInterval(interval);
			}
		}, 1000);
	}

	testServiceAcc() {
		this.adminApiService.apiAdminSheetsTestPost().subscribe((res) => console.log(res));
	}

	test() {
		this.adminApiService.apiAdminTestGet(9).subscribe((res) => console.log(res));
	}
}
