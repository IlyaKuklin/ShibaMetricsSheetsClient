import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmFacebookAuthService } from '../../services/sm-facebook-auth.service';

@Component({
	selector: 'sm-fb-api-verification-code-receiver',
	templateUrl: './fb-api-verification-code-receiver.component.html',
	styleUrls: [ './fb-api-verification-code-receiver.component.scss' ]
})
export class FbApiVerificationCodeReceiverComponent implements OnInit {
	constructor(private readonly route: ActivatedRoute, private readonly facebookAuthService: SmFacebookAuthService) {}

	message: string;

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.message = 'Ожидайте';
			const code = params.code;
			this.facebookAuthService.exchangeCodeForToken(code).subscribe((res) => {
				this.facebookAuthService.setUserData(res);
				this.message = 'Авторизация успешно пройдена, это окно можно закрыть';
			});
		});
	}
}
