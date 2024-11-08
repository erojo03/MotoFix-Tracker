import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Model } from '../interfaces/model.interface';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly _http = inject(HttpClient);
  private readonly _models = signal<Model[]>([]);

  get models() {
    return this._models.asReadonly();
  }

  getModelsByBrand(brandId: number): Observable<Model[]> {
    return this._http.get<Model[]>(
      `${environment.API_URL}/motorcycle/model/brand/${brandId}`
    ).pipe(tap((models) => this._models.set(models)));
  }

  addModel(brandId: number, name: string): Observable<Model> {
    return this._http.post<Model>(`${environment.API_URL}/motorcycle/model`, {
      brandId,
      name,
    });
  }
}
