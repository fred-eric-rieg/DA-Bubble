import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../shared/services/authentication/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appGuest]'
})
export class GuestDirective {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  @HostListener('click')
    async onClick() {
      let response = await this.authService.loginAnonymous();
      if (response === 'success') {
        this.router.navigate(['/dashboard']);
      }
  }
}
