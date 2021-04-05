import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { SmGoogleAuthService } from '../integration/services/sm-google-auth.service';
import { SmYandexAuthService } from '../integration/services/sm-yandex-auth.service';
// import { SmGoogleAuthService } from '../integration-google/services/sm-google-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private readonly authService: AuthService,
		private readonly googleAuthService: SmGoogleAuthService,
		private readonly yandexAuthService: SmYandexAuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if (this.authService.isLoggedIn()) {
			const jwtToken = this.authService.getToken();
			let authReq = req.clone({
				setHeaders: { Authorization: 'Bearer ' + jwtToken }
			});

			// if (this.googleAuthService.isUserSignedIn()) {
			// 	const googleToken = this.googleAuthService.getGoogleData().access_token;
			// 	authReq = authReq.clone({
			// 		setHeaders: { GoogleAuthorization: 'Google ' + googleToken }
			// 	});
			// }

			if (this.yandexAuthService.isSignedInYandex) {
				const yandexToken = this.yandexAuthService.accessToken;
				authReq = authReq.clone({
					setHeaders: { YandexAuthorization: 'Yandex ' + yandexToken }
				});
			}

			return next.handle(authReq);
		}

		return next.handle(req);
	}
}
