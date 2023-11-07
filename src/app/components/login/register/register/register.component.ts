import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  credentials = {
    email: '',
    password: '',
    password2: ''
  };

  constructor(private authService: AuthService, private router: Router) { }


  validate(): boolean {
    if (this.credentials.email.length > 0 && this.credentials.password.length > 0 && this.credentials.password2.length > 0 && this.credentials.password === this.credentials.password2) {
      return true;
    } else {
      return false;
    }
  }


  async registerAccount() {
    if (this.validate()) {
      let response = await this.authService.signUp(this.credentials.email, this.credentials.password);
      if (response === 'success') {
        this.router.navigate(['/login']);
      }
    }
  }
}
