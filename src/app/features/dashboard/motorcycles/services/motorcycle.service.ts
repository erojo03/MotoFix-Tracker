import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MotorcycleList } from '../interfaces/motorcycle.interface';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleService {
  private _http = inject(HttpClient);
  private _motorcycles = signal<MotorcycleList[]>([]);

  get motorcycles() {
    return this._motorcycles.asReadonly();
  }

  getMotos(): Observable<MotorcycleList[]> {
    return this._http
      .get<MotorcycleList[]>(`${environment.API_URL}/motorcycle`)
      .pipe(tap((motorcycles) => this._motorcycles.set(motorcycles)));
  }

  addMoto(
    brandId: number,
    modelId: number,
    plate: string,
    deliveryDate: string,
    userId: string
  ) {
    return this._http.post(`${environment.API_URL}/motorcycle`, {
      brandId,
      modelId,
      plate,
      deliveryDate,
      userId,
    });
  }

  updateMoto(
    id: number,
    brandId: string,
    modelId: string,
    plate: string,
    deliveryDate: string
  ) {
    return this._http.patch(`${environment.API_URL}/motorcycle/${id}`, {
      brandId,
      modelId,
      plate,
      deliveryDate,
    });
  }

  removeMoto(id: number) {
    return this._http.delete(`${environment.API_URL}/motorcycle/${id}`);
  }
}
