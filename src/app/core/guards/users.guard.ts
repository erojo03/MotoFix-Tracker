import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../services/data/current-user.service';
import { BreakpointService } from '../services/utils/breakpoints.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export const usersGuard: CanActivateFn = () => {
  const _currentUser = inject(CurrentUserService);
  const _breakpointService = inject(BreakpointService);
  const _router = inject(Router);

  const currentRole = _currentUser.role;

  const isMobile$ = _breakpointService.breakpoints$.pipe(
    map(({ isMobile }) => isMobile)
  );

  const isMobile = toSignal(isMobile$);

  if (!isMobile() && currentRole !== 'admin') {
    _router.navigateByUrl('/');
    return false;
  }

  return true;
};
