import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  }

  constructor() {
  }

  validate(): boolean {
    if (this.credentials.email.length > 0 && this.credentials.password.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
