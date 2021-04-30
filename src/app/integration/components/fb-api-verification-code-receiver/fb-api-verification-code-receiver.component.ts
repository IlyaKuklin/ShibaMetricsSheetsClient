import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFacebookAuthData, SmFacebookAuthService } from '../../services/sm-facebook-auth.service';

@Component({
	selector: 'sm-fb-api-verification-code-receiver',
	templateUrl: './fb-api-verification-code-receiver.component.html',
	styleUrls: [ './fb-api-verification-code-receiver.component.scss' ]
})
export class FbApiVerificationCodeReceiverComponent implements OnInit {
	constructor(private readonly route: ActivatedRoute, private readonly facebookAuthService: SmFacebookAuthService) {}

	ngOnInit(): void {
		// this.route.queryParams.subscribe((params) => {
		// 	const code = params.code;
		// 	this.facebookAuthService.exchangeCodeForToken(code).then((res) => {
		// 		res.json().then((result: IFacebookAuthData) => {
		// 			this.facebookAuthService.exchangeTokenForLongLivedToken(result.access_token).then((res) => {
		// 				res.json().then((result : IFacebookAuthData) => {
		// 					console.log(result);
		// 				});
		// 			});
		// 		});
		// 	});
		// });


    this.route.queryParams.subscribe((params) => {
			const code = params.code;
			this.facebookAuthService.exchangeCodeForToken(code).subscribe((res) => {

        console.log(res);
				
			});
		});
	}
}
