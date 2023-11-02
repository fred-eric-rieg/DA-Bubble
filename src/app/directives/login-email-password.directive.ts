import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Directive({
  selector: '[appLoginEmailPassword]'
})
export class LoginEmailPasswordDirective {

  @Input('appLoginEmailPassword') credentials = { email: '', password: '' };

  constructor(
    private el: ElementRef,
    private authService: AuthService,
    private router: Router) {}


  @HostListener('click')
    async onClick() {
      const auth = getAuth();
      let response = await this.authService.signInNormal(auth, this.credentials.email, this.credentials.password);
      if (response) {
        this.router.navigate(['/dashboard']);
      }
  }
}
