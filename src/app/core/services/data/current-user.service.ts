import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private _jwtHelper = inject(JwtHelperService);

  getUserInfo(): UserInfo {
    const userInfo = this._jwtHelper.decodeToken();
    return userInfo;
  }

  get id(): string {
    return this.getUserInfo().id;
  }

  get phone(): string {
    return this.getUserInfo().phone;
  }

  get fullName(): string {
    return `${this.getUserInfo().firstName} ${this.getUserInfo().lastName}`;
  }

  get shortName(): string {
    return `${this.getUserInfo().firstName.split(' ')[0]} ${this.getUserInfo().lastName.split(' ')[0]}`;
  }

  get role(): string {
    return this.getUserInfo().role;
  }
}
