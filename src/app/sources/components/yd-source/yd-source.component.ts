import { Component, Input, OnInit } from '@angular/core';
import { SMSourceDto } from 'src/api/rest/api';

@Component({
	selector: 'sm-yd-source',
	templateUrl: './yd-source.component.html',
	styleUrls: [ './yd-source.component.scss' ]
})
export class YdSourceComponent implements OnInit {
	constructor() {}

	isLoading: boolean;

	@Input() id: number;
	source: SMSourceDto;

	ngOnInit(): void {}
}
