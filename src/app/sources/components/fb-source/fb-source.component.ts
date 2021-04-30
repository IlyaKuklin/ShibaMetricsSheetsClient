import { Component, OnInit } from '@angular/core';
import { SmFacebookAuthService } from 'src/app/integration/services/sm-facebook-auth.service';

@Component({
	selector: 'sm-fb-source',
	templateUrl: './fb-source.component.html',
	styleUrls: [ './fb-source.component.scss' ]
})
export class FbSourceComponent implements OnInit {
	constructor(private readonly facebookAuthService: SmFacebookAuthService) {}

	ngOnInit(): void {}

  test() {
    this.facebookAuthService.login();
  }
}
