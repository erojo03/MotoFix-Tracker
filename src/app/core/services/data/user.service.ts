import { inject, Injectable } from '@angular/core';
import { RoleService } from './role.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { User, UserList } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _roleService = inject(RoleService);
  private readonly _http = inject(HttpClient);

  getUsers(): Observable<UserList[]> {
    return this._http.get<UserList[]>(`${environment.API_URL}/users`).pipe(
      map((response) =>
        response.map((user) => {
          return {
            ...user,
            role: this._roleService.rolesTranslate[user.role] || user.role,
          };
        })
      )
    );
  }

  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${environment.API_URL}/users/${id}`);
  }

  deleteUser(id: string): Observable<unknown> {
    return this._http.delete<unknown>(`${environment.API_URL}/users/${id}`);
  }

  updateUser(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    roleId: number
  ): Observable<User> {
    return this._http.put<User>(`${environment.API_URL}/users/${id}`, {
      firstName,
      lastName,
      phone,
      password,
      roleId,
    });
  }
}
