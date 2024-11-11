import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { MotorcycleProcess } from '../interfaces/process.interface';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleProcessService {
  private _http = inject(HttpClient);
  private readonly _processes = signal<MotorcycleProcess[]>([]);

  get processes() {
    return this._processes.asReadonly();
  }

  getProcesses(motoId: number): Observable<MotorcycleProcess[]> {
    return this._http
      .get<MotorcycleProcess[]>(`${environment.API_URL}/moto-process/${motoId}`)
      .pipe(tap((processes) => this._processes.set(processes)));
  }

  completeProcess(
    motoId: number,
    processId?: number,
    userId?: string
  ): Observable<MotorcycleProcess> {
    return this._http.post<MotorcycleProcess>(
      `${environment.API_URL}/moto-process/${motoId}`,
      {
        processId,
        userId,
      }
    );
  }
}
