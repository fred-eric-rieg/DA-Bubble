import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedStatus = authService.isLoggedIn();
  if (!loggedStatus) {
    return router.createUrlTree([router.parseUrl('/login')],
    {
      queryParams: { loggedOut: true, origUrl: state.url }
    });
  } else {
    return true;
  }
};
