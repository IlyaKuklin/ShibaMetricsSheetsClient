import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserAuthResponseDto } from 'src/api/rest/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private TOKEN: string = 'token';
  private USER_DATA: string = 'user_data';
  private ROLE: string = 'role';

  userDataSubject = new Subject<UserAuthResponseDto>();

  isLoggedIn(): boolean {
    return (
      !!window.localStorage[this.TOKEN] && !!window.localStorage[this.USER_DATA]
    );
  }

  setUserData(userData: UserAuthResponseDto) {
    this.userDataSubject.next(userData);
    window.localStorage[this.USER_DATA] = JSON.stringify(userData);
    window.localStorage[this.TOKEN] = userData.token;
    window.localStorage[this.ROLE] = userData.role;
  }

  clearUserData(): void {
    this.userDataSubject.next(null);

    window.localStorage.removeItem(this.USER_DATA);
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.removeItem(this.ROLE);
  }

  getToken(): string {
    if (!this.isLoggedIn()) return null;
    return window.localStorage[this.TOKEN];
  }

  getUserData(): UserAuthResponseDto {
    if (!this.isLoggedIn()) return null;

    const userDataRaw = window.localStorage[this.USER_DATA];
    if (!userDataRaw) return null;
    try {
      return JSON.parse(userDataRaw);
    } catch (e) {
      console.error('Невозможно получить данные из локального хранилища: ' + e);
      return null;
    }
  }
}
