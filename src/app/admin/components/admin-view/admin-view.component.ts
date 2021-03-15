import { Component, OnInit } from '@angular/core';
import { AdminApiService } from 'src/api/rest/api';

@Component({
	selector: 'sm-admin-view',
	templateUrl: './admin-view.component.html',
	styleUrls: [ './admin-view.component.scss' ]
})
export class AdminViewComponent implements OnInit {
	constructor(private readonly adminApiService: AdminApiService) {}

	ngOnInit(): void {}

	updateGaColumns(): void {
		this.adminApiService.apiAdminGaMetadataPatch().subscribe();
	}
}
