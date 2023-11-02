import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



@Directive({
  selector: '[appLoginEmailPassword]'
})
export class LoginEmailPasswordDirective {
  private auth: Auth = inject(Auth);


  @Input('appLoginEmailPassword') credentials = { email: '', password: '' };

  constructor(
    private el: ElementRef,
    private router: Router
    ) {}


  @HostListener('click')
    async onClick() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.credentials.email, this.credentials.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          let message = document.body.appendChild(document.createElement('div'));
          message.textContent = 'You are logged in!';
          message.setAttribute('style', 'position: fixed; top: 50%; left: calc(50% - 116px); background-color: #000; color: #fff; padding: 1rem; width: 200px; border-radius: 10px;');
          setTimeout(() => {
            message.remove();
          }, 3000);
          this.router.navigate(['/dashboard']);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let message = document.body.appendChild(document.createElement('div'));
          message.textContent = 'Wrong credentials!';
          message.setAttribute('style', 'position: fixed; top: 50%; left:  calc(50% - 116px); background-color: #000; color: #fff; padding: 1rem; width: 200px; border-radius: 10px;');
          setTimeout(() => {
            message.remove();
          }, 3000);
        });
  }
}
