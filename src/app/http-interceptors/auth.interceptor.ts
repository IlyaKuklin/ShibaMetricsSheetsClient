import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { SmGoogleAuthService } from '../integration/services/sm-google-auth.service';
// import { SmGoogleAuthService } from '../integration-google/services/sm-google-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: SmGoogleAuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // TODO: конфиг
    if (req.url.startsWith('https://api-metrika.yandex.net'))
      return next.handle(req);

    if (this.authService.isLoggedIn()) {
      const jwtToken = this.authService.getToken();
      let authReq = req.clone({
        setHeaders: { Authorization: 'Bearer ' + jwtToken },
      });

      if (this.googleAuthService.isUserSignedIn()) {
        const googleToken = this.googleAuthService.getGoogleData().access_token;
        authReq = authReq.clone({
          setHeaders: { GoogleAuthorization: 'Google ' + googleToken },
        });
      }

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
