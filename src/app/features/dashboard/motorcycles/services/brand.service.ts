import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Brand } from '../interfaces/brand.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly _http = inject(HttpClient);
  private readonly _brands = signal<Brand[]>([]);

  get brands() {
    return this._brands.asReadonly();
  }

  getBrands(): Observable<Brand[]> {
    return this._http
      .get<Brand[]>(`${environment.API_URL}/motorcycle/brand`)
      .pipe(tap((brands) => this._brands.set(brands)));
  }

  addBrand(brand: string) {
    return this._http.post(`${environment.API_URL}/motorcycle/brand`, {
      name: brand,
    });
  }
}
