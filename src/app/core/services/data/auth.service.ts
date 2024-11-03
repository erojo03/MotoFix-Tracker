import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signUp } from '../../interfaces/auth.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  signUp(
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    roleId: number
  ): Observable<signUp> {
    return this._http.post<signUp>(`${environment.API_URL}/auth/sign-up`, {
      firstName,
      lastName,
      phone,
      password,
      roleId,
    });
  }

  logIn(phone: number, password: string): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>(
      `${environment.API_URL}/auth/log-in`,
      {
        phone,
        password,
      }
    );
  }
}
