import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

  email = '';

  constructor(private router: Router) { }


  validate() {
    if (this.email.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  resetPassword() {
    if (this.validate()) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.writeMessage('Email sent with instructions');
          this.email = '';
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.writeMessage(errorMessage);
        });
    }
  }


  // This method is used to display a message on the bottom of the screen
  writeMessage(text: string) {
    let message = document.body.appendChild(document.createElement('div'));
    message.textContent = text;
    message.setAttribute('style', 'position: fixed; bottom: 10%; left: calc(50% - 116px); background-color: #000; color: #fff; padding: 1rem; width: 200px; border-radius: 10px; text-align: center; z-index: 999;');
    setTimeout(() => {
      message.remove();
    }, 3000);
  }

}
