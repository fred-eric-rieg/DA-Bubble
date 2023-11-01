import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

@Directive({
  selector: '[appLoginEmailPassword]'
})
export class LoginEmailPasswordDirective {

  @Input('appLoginEmailPassword') credentials = { email: '', password: '' };

  constructor(private el: ElementRef) {

  }


  @HostListener('click') async onClick() {
    let auth = getAuth();

    let response = await signInWithEmailAndPassword(auth, this.credentials.email, this.credentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      console.log(response);
  }
}
