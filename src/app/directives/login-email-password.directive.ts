import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AuthService } from '../shared/services/authentication/auth.service';
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
        let token = await response.getIdToken();
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      }
  }
}
