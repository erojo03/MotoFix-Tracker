import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Role } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private _http = inject(HttpClient);

  rolesTranslate: Record<string, string> = {
    admin: 'Administrador',
    receptionist: 'Recepcionista',
    'workshop manager': 'Jefe de Taller',
    mechanics: 'Mecanico',
    storekeeper: 'Almacenero',
    // Agrega más traducciones según sea necesario
  };

  getRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(`${environment.API_URL}/roles`).pipe(
      map((response) =>
        response.map((role) => {
          return {
            id: role.id,
            name: this.translateRole(role.name),
          };
        })
      )
    );
  }

  translateRole(roleName: string): string {
    return this.rolesTranslate[roleName] || roleName;
  }
}
