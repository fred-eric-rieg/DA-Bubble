import { Component } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

  email = '';

  constructor() { }


  validate() {
    if (this.email.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  

  resetPassword() {
    if (this.validate()) {
      // this.authService.resetPassword(this.email);
    }
  }

}
