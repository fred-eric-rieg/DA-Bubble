import { Directive, HostListener, Input } from '@angular/core';
import { AuthService } from '../shared/services/authentication/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appLoginEmailPassword]'
})
export class LoginEmailPasswordDirective {

  @Input('appLoginEmailPassword') credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}


  @HostListener('click')
    async onClick() {
      let response = await this.authService.logInNormal(this.credentials.email, this.credentials.password);
      if (response === 'success') {
        this.router.navigate(['/dashboard']);
      }
  }
}
