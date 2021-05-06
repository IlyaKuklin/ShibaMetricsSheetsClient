import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookApiService } from 'src/api/rest/api';

@Injectable({
	providedIn: 'root'
})
export class SmFacebookAuthService {
	constructor(private readonly facebookApiService: FacebookApiService) {}

	private readonly STORAGE_KEY: string = 'fb_data';

	authorize() {
		var url = `https://www.facebook.com/v10.0/dialog/oauth?client_id=261566715709670&redirect_uri=https://localhost:4200/fb-verification/&scope=ads_read`;
		window.open(url, 'auth', 'resizable,scrollbars,status,width=600,height=500');
	}

	exchangeCodeForToken(code: string) {
		const redirectUrl = `${window.location.origin}/fb-verification/`;
		return this.facebookApiService.apiFacebookExchangeCodeForTokenGet(code, redirectUrl);
	}
}

export interface IFacebookAuthData {
	token_type: string;
	access_token: string;
	expires_in: number;
	expirationDate: number;
}
