import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmYandexAuthService } from '../../services/sm-yandex-auth.service';

@Component({
	selector: 'sm-yandex-api-verification-code-receiver',
	templateUrl: './yandex-api-verification-code-receiver.component.html',
	styleUrls: [ './yandex-api-verification-code-receiver.component.scss' ]
})
export class YandexApiVerificationCodeReceiverComponent implements OnInit {
	constructor(private readonly route: ActivatedRoute, private readonly smYandexAuthService: SmYandexAuthService) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.smYandexAuthService
				.exchangeCodeForToken(params.code)
				.catch((e) => {
					alert('Произошла ошибка');
				})
				.then(() => {
					alert('Авторизация завершена. Окно можно закрыть');
				});
		});
	}
}
