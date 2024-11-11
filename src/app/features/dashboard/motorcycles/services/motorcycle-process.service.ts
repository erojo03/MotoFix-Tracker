import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { MotorcycleProcess } from '../interfaces/process.interface';
import { MotorcycleService } from './motorcycle.service';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleProcessService {
  private _http = inject(HttpClient);
  private _motorcycleService = inject(MotorcycleService);
  private readonly _processes = signal<MotorcycleProcess[]>([]);

  get processes() {
    return this._processes.asReadonly();
  }

  getProcesses(motoId: number): Observable<MotorcycleProcess[]> {
    return this._http
      .get<MotorcycleProcess[]>(`${environment.API_URL}/moto-process/${motoId}`)
      .pipe(
        tap((processes) => {
          this._processes.set(processes);
          this._motorcycleService.getMotos().subscribe();
        })
      );
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
