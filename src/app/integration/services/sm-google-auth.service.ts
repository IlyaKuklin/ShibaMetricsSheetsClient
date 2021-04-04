import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { Subject } from 'rxjs';
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root',
})
export class SmGoogleAuthService {
  constructor(private googleAuthService: GoogleAuthService) {}

  static readonly STORAGE_KEY: string = 'gapi_data';
  private user: GoogleUser = undefined;

  flow = new Subject<any>();

  get isSignedInGoogle(): boolean {
    return !!window.localStorage[SmGoogleAuthService.STORAGE_KEY];
  }

  setUser(user: GoogleUser): void {
    this.user = user;
  }

  getCurrentUser(): GoogleUser {
    return this.user;
  }

  signIn(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn({prompt: 'select_account'}).then((response) => {
        const authResponse = response.getAuthResponse();
        window.localStorage[SmGoogleAuthService.STORAGE_KEY] = JSON.stringify(
          authResponse
        );

        var profile = response.getBasicProfile();

        this.flow.next(true);
      });
    });
  }

  signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
      } catch (e) {
        console.error(e);
      }
      window.localStorage.removeItem(SmGoogleAuthService.STORAGE_KEY);
    });
  }

  isUserSignedIn(): boolean {
    return !!window.localStorage[SmGoogleAuthService.STORAGE_KEY];
  }

  getGoogleData(): gapi.auth2.AuthResponse {
    if (!window.localStorage[SmGoogleAuthService.STORAGE_KEY]) return null;

    const value: string = window.localStorage[SmGoogleAuthService.STORAGE_KEY];
    const authData: gapi.auth2.AuthResponse = JSON.parse(value);
    const now = new Date().getTime();

    // TODO: ждать обзерваблы и промисы.
    if (now >= authData.expires_at) {
      this.googleAuthService.getAuth().subscribe((auth) => {
        var user = auth.currentUser.get();
        user.reloadAuthResponse().then(
          (authResponse) => {
            window.localStorage[
              SmGoogleAuthService.STORAGE_KEY
            ] = JSON.stringify(authResponse);
            return this.getGoogleData();
          },
          (err) => {
            console.error(err);
          }
        );
      });
    }

    return authData;
  }

  // getToken(): string {
  //   let token: string = sessionStorage.getItem(
  //     SmGoogleAuthService.SESSION_STORAGE_KEY
  //   );
  //   if (!token) {
  //     throw new Error('no token set , authentication required');
  //   }
  //   return sessionStorage.getItem(SmGoogleAuthService.SESSION_STORAGE_KEY);
  // }

  // renewToken() {
  //   this.googleAuthService.getAuth().subscribe((auth) => {
  //     var user = auth.currentUser.get();

  //     console.log(user);

  //     user.reloadAuthResponse().then(
  //       (resp) => {
  //         console.log(resp);
  //       },
  //       (err) => {
  //         console.error(err);
  //       }
  //     );
  //   });
  // }

  // private signInSuccessHandler(res: GoogleUser) {
  //   this.user = res;
  //   sessionStorage.setItem(
  //     SmGoogleAuthService.SESSION_STORAGE_KEY,
  //     res.getAuthResponse().access_token
  //   );
  // }
}
