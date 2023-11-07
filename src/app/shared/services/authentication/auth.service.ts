import { Injectable, inject } from '@angular/core';
import { Auth, browserSessionPersistence, setPersistence } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);


  constructor(private router: Router, private us: UserService) { }

  async logInNormal(auth: Auth, email: string, password: string) {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.us.loggedUser = user.uid;
        this.writeMessage('Signed in!');
        return 'success';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.writeMessage('Login failed!');
        return 'error';
      });
  }


  async signOut() {
    const auth = getAuth();
    await auth.signOut();
    localStorage.removeItem('user');
    this.writeMessage('Signed out!');
    this.router.navigate(['/login']);
  }


  writeMessage(text: string) {
    let message = document.body.appendChild(document.createElement('div'));
    message.textContent = text;
    message.setAttribute('style', 'position: fixed; bottom: 10%; left: calc(50% - 116px); background-color: #000; color: #fff; padding: 1rem; width: 200px; border-radius: 10px; text-align: center; z-index: 999;');
    setTimeout(() => {
      message.remove();
    }, 3000);
  }


  isLoggedIn() {
    const auth = getAuth();
    return auth.currentUser;
  }


}
