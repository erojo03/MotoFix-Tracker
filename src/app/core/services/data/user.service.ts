import { inject, Injectable, signal } from '@angular/core';
import { RoleService } from './role.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { User, UserList } from '../../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _roleService = inject(RoleService);
  private readonly _authService = inject(AuthService);
  private readonly _http = inject(HttpClient);
  private _users = signal<UserList[]>([]);

  get users() {
    return this._users.asReadonly();
  }

  getUsers(): Observable<UserList[]> {
    return this._http.get<UserList[]>(`${environment.API_URL}/users`).pipe(
      map((response) =>
        response.map((user) => {
          return {
            ...user,
            role: {
              id: user.role.id,
              name: this._roleService.translateRole(user.role.name),
            },
          };
        })
      ),
      tap((users) => this._users.set(users))
    );
  }

  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${environment.API_URL}/users/${id}`);
  }

  createUser(
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    roleId: number
  ) {
    return this._authService
      .signUp(firstName, lastName, phone, password, roleId)
      .pipe(switchMap(() => this.getUsers()));
  }

  deleteUser(id: string) {
    return this._http
      .delete<unknown>(`${environment.API_URL}/users/${id}`)
      .pipe(switchMap(() => this.getUsers()));
  }

  updateUser(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    roleId: number
  ): Observable<UserList[]> {
    return this._http
      .put<UserList[]>(`${environment.API_URL}/users/${id}`, {
        firstName,
        lastName,
        phone,
        password,
        roleId,
      })
      .pipe(switchMap(() => this.getUsers()));
  }
}
