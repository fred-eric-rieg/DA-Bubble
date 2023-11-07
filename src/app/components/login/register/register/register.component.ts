import { Component } from '@angular/core';

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

  constructor() { }


  validate(): boolean {
    if (this.credentials.email.length > 0 && this.credentials.password.length > 0 && this.credentials.password2.length > 0 && this.credentials.password === this.credentials.password2) {
      return true;
    } else {
      return false;
    }
  }


  registerAccount() {
    if (this.validate()) {
      // this.authService.register(this.credentials.email, this.credentials.password);
    }
  }
}
