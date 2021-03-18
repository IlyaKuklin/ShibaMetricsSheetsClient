import { Component, OnInit } from '@angular/core';
import { AdminApiService, YandexDirectApiService } from 'src/api/rest/api';
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
		private readonly yandexAuthService: SmYandexAuthService
	) {}

	ngOnInit(): void {}

	updateGaColumns(): void {
		this.adminApiService.apiAdminGaMetadataPatch().subscribe();
	}

	updateCampaigns() {
		this.ydApiService.apiYandexDirectCampaingsPatch().subscribe((response) => console.log(response));
	}

	updateClients() {
		this.ydApiService.apiYandexDirectClientsPatch().subscribe((response) => console.log(response));
	}
}
