import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { YandexDirectApiService } from 'src/api/rest/api';

@Injectable({
	providedIn: 'root'
})
export class SmYandexAuthService {
	constructor(private readonly ydService: YandexDirectApiService) {
		console.log('SmYandexAuthService');
	}

	// TODO: в конфиг через provider
	private readonly APP_ID: string = '1443711d95874286bfb64baa41c29459';

	private readonly STORAGE_KEY: string = 'yapi_data';
	private readonly AUTH_URL: string = 'https://oauth.yandex.ru';

	isSignedInYandex(name: string): boolean {
		if (!window.localStorage[this.STORAGE_KEY]) return false;
		const data: IYandexUserData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		const userData = data.find((x) => x.name == name);
		if (!userData) return false;
		return !!userData;
	}

	getSignedInAccountNames(): string[] {
		if (!window.localStorage[this.STORAGE_KEY]) return [];
		const data: IYandexUserData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		return data.map((x) => x.name);
	}

	getTokenByAccount(accountName: string): string {
		const data: IYandexUserData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		const userData = data.find((x) => x.name == accountName);
		if (!userData) return '';
		return userData.authData.access_token;
	}

	// get accessToken(): string {
	// 	if (!this.isSignedInYandex) {
	// 		//TODO check date and refresh
	// 	}

	// 	const data = window.localStorage[this.STORAGE_KEY];
	// 	if (!data) {
	// 		this.authorize();
	// 		return;
	// 	}
	// 	const json: IYandexAuthData = JSON.parse(data);

	// 	if (json.expirationDate < Date.now()) {
	// 		// TODO: await fetch
	// 		this.exchangeRefreshTokenForToken();
	// 	}

	// 	return json.access_token;
	// }

	get refreshToken(): string {
		const data = window.localStorage[this.STORAGE_KEY];
		const json: IYandexAuthData = JSON.parse(data);
		return json.refresh_token;
	}

	authorize(): void {
		var url = `${this.AUTH_URL}/authorize?response_type=code&client_id=${this.APP_ID}&force_confirm=true`;
		window.open(url, 'auth', 'resizable,scrollbars,status,width=600,height=500');
	}

	exchangeCodeForToken(code: string) {
		let body = new URLSearchParams();
		body.set('grant_type', 'authorization_code');
		body.set('code', code);
		body.set('client_id', '1443711d95874286bfb64baa41c29459');
		body.set('client_secret', '6e308b0e1a6d45b1abfad1096c35064c');

		return fetch('https://oauth.yandex.ru/token', {
			body: body,
			method: 'POST'
		}).then((res) => {
			res.json().then((tokenResponse: IYandexAuthData) => {
				this.ydService.apiYandexDirectUserDataGet(tokenResponse.access_token).subscribe((userDataResponse) => {
					const expirationDate = Date.now() + tokenResponse.expires_in;
					tokenResponse.expirationDate = expirationDate;
					const userData: IYandexUserData = {
						name: userDataResponse.login,
						authData: tokenResponse
					};

					let usersArray: IYandexUserData[];
					if (!window.localStorage[this.STORAGE_KEY]) usersArray = [];
					else usersArray = JSON.parse(window.localStorage[this.STORAGE_KEY]);
					usersArray = usersArray.filter((x) => x.name !== userData.name);
					usersArray.push(userData);
					window.localStorage[this.STORAGE_KEY] = JSON.stringify(usersArray);

					window.localStorage['yandexFlow'] = '0';
				});
			});
		});
	}

	exchangeRefreshTokenForToken(): void {
		let body = new URLSearchParams();
		body.set('grant_type', 'refresh_token');
		body.set('refresh_token', this.refreshToken);
		body.set('client_id', '1443711d95874286bfb64baa41c29459');
		body.set('client_secret', '6e308b0e1a6d45b1abfad1096c35064c');

		fetch('https://oauth.yandex.ru/token', {
			body: body,
			method: 'POST'
		}).then((res) => {
			res.json().then((tokenResponse: IYandexAuthData) => {
				const expirationDate = Date.now() + tokenResponse.expires_in;
				tokenResponse.expirationDate = expirationDate;
				localStorage[this.STORAGE_KEY] = JSON.stringify(tokenResponse);
			});
		});
	}
}

interface IYandexAuthData {
	token_type: string;
	access_token: string;
	expires_in: number;
	refresh_token: string;
	expirationDate: number;
}

export interface IYandexUserData {
	name: string;
	authData: IYandexAuthData;
}
