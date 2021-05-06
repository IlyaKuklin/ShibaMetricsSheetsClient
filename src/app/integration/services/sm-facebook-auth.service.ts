import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookApiService, FacebookAuthData } from 'src/api/rest/api';

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

	setUserData(userData: FacebookAuthData) {
		let usersArray: FacebookAuthData[];
		if (!window.localStorage[this.STORAGE_KEY]) usersArray = [];
		else usersArray = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		usersArray = usersArray.filter((x) => x.userName !== userData.userName);
		usersArray.push(userData);
		window.localStorage[this.STORAGE_KEY] = JSON.stringify(usersArray);
	}

	isSignedIn(login: string): boolean {
		if (!window.localStorage[this.STORAGE_KEY]) return false;
		const data: FacebookAuthData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		const userData = data.find((x) => x.userName == login);
		if (!userData) return false;
		return !!userData;
	}

	getSignedInAccountNames(): string[] {
		if (!window.localStorage[this.STORAGE_KEY]) return [];
		const data: FacebookAuthData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		return data.map((x) => x.userName);
	}

	getTokenByAccount(login: string): string {
		const data: FacebookAuthData[] = JSON.parse(window.localStorage[this.STORAGE_KEY]);
		const userData = data.find((x) => x.userName == login);
		if (!userData) return '';

		if (userData.expiresAt < Date.now()) {
			// this.exchangeRefreshTokenForToken(login).then((response) => {
			// 	return userData.authData.access_token;
			// });
		}

		return userData.accessToken;
	}
}
