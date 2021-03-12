import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// TODO: ограничить собственным API
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((event) => {
        if (event instanceof HttpErrorResponse) {
          if (event.status >= 400 && event.status < 500) {
            this.router.navigate(['/auth']);
          } else if (event.status >= 500) {
            this.router.navigate(['/error']);
          }
        }
        return throwError(event);
      })
    );
  }
}
