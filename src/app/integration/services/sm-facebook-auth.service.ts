import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SmFacebookAuthService {
	constructor(private readonly httpClient: HttpClient) {}

	authorize() {
		var url = `https://www.facebook.com/v10.0/dialog/oauth?client_id=261566715709670&redirect_uri=https://localhost:4200/fb-verification/&scope=ads_read`;
		window.open(url, 'auth', 'resizable,scrollbars,status,width=600,height=500');
	}

	/** Обменять код доступа на краткосрочный токен */
	exchangeCodeForToken(code: string) {
		const url = 'https://graph.facebook.com/v10.0/oauth/access_token?';
		const params = new URLSearchParams({
			client_id: '261566715709670',
			redirect_uri: 'https://localhost:4200/fb-verification/',
			client_secret: '3654071a87f66a4427e13e77eb423b6e',
			code: code
		});

		return fetch(url + params, {
			method: 'GET'
		});
	}

	/** Обменять краткосрочный токен на долгосрочный токен*/
	exchangeTokenForLongLivedToken(token: string) {
		const url = 'https://graph.facebook.com/v10.0/oauth/access_token?';
		const params = new URLSearchParams({
			client_id: '261566715709670',
			redirect_uri: 'https://localhost:4200/fb-verification/',
			client_secret: '3654071a87f66a4427e13e77eb423b6e',
			grant_type: 'fb_exchange_token',
			fb_exchange_token: token
		});

		return fetch(url + params, {
			method: 'GET'
		});
	}
}

export interface IFacebookAuthData {
	token_type: string;
	access_token: string;
	expires_in: number;
	expirationDate: number;
}
