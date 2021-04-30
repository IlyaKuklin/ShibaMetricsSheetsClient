import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SmFacebookAuthService {
	constructor() {}

    login() {
        var url = `https://www.facebook.com/v10.0/dialog/oauth?client_id=261566715709670&redirect_uri=https://localhost:4200/&scope=ads_read`;
		window.open(url, 'auth', 'resizable,scrollbars,status,width=600,height=500');
    }
}
