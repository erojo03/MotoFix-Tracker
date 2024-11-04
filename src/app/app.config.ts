import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => {
          return localStorage.getItem('session');
        },
        allowedDomains: ['localhost:4200'], // Reemplaza con tu dominio
      },
    },
  ],
};
