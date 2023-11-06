import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/authentication/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedStatus = authService.isLoggedIn();
  if (!loggedStatus) {
    if (localStorage.getItem('user')) {
      return true
    } else {
      return router.navigate(['/login']);
    }
  } else {
    return true;
  }
};
