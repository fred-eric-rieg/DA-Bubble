import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);


  constructor(private router: Router) { }

  async signInNormal(auth: Auth, email: string, password: string) {
    let response = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.writeMessage('Signed in!');
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.writeMessage('Login failed!');
      });
  }


  async signOut() {
    const auth = getAuth();
    await auth.signOut();
    this.writeMessage('Signed out!');
    this.router.navigate(['/login']);
  }


  writeMessage(text: string) {
    let message = document.body.appendChild(document.createElement('div'));
    message.textContent = text;
    message.setAttribute('style', 'position: fixed; top: 10%; left: calc(50% - 116px); background-color: #000; color: #fff; padding: 1rem; width: 200px; border-radius: 10px; text-align: center; z-index: 999;');
    setTimeout(() => {
      message.remove();
    }, 3000);
  }


  isLoggedIn() {
    const auth = getAuth();
    return auth.currentUser;
  }


}
