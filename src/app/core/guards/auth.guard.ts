import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/utils/storage.service';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const publicGuard: CanActivateFn = () => {
  const _storageService = inject(StorageService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = _storageService.get('session');

  if (token) {
    try {
      // Verifica si el token tiene la estructura de un JWT
      if (token.split('.').length !== 3) {
        throw new Error('Token inválido');
      }
      // Verifica si el token ha expirado
      if (!jwtHelper.isTokenExpired(token)) {
        router.navigateByUrl('/home');
        return false;
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
    // Borra el token inválido
      _storageService.remove('session');
    }
  }

  return true;
};

export const privateGuard: CanActivateFn = () => {
  const _storageService = inject(StorageService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = _storageService.get('session');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Verifica si el token tiene la estructura de un JWT
    if (token.split('.').length !== 3) {
      throw new Error('Token inválido');
    }

    // Verifica si el token ha expirado
    if (jwtHelper.isTokenExpired(token)) {
      throw new Error('Token expirado');
    }

    // Token válido
    return true;
  } catch (error) {
    console.error('Error al validar el token:', error);
    // Borra el token inválido
    _storageService.remove('session');
    router.navigate(['/login']);
    return false;
  }
};
