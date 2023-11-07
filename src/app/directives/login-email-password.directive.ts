import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AuthService } from '../shared/services/authentication/auth.service';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

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
      const auth = getAuth();
      let response = await this.authService.logInNormal(auth, this.credentials.email, this.credentials.password);
      if (response === 'success') {
        this.router.navigate(['/dashboard']);
      }
  }
}
