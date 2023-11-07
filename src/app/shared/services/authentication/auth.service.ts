import { Injectable, inject } from '@angular/core';
import { Auth, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInAnonymously } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);


  constructor(private router: Router, private us: UserService) { }


  async signUp(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.us.createUser({ id: user.uid, email: user.email || '', timestamp: Date.now() });
        this.writeMessage('Account created!');
        return 'success';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.writeMessage(errorMessage);
        return 'error';
      });
  }


  async loginAnonymous() {
    const auth = getAuth();
    return signInAnonymously(auth)
    .then((userCredential) => {
      const user = userCredential.user;
      this.us.createUser({ id: user.uid, email: 'guest@user.de', timestamp: Date.now() });
      this.writeMessage('Logged in!');
      return 'success';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.writeMessage(errorMessage);
      return 'error';
    });
  }


  async logInNormal(email: string, password: string) {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Closing browser will clear any state
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.us.loggedUser = user.uid;
        this.writeMessage('Logged in!');
        return 'success';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.writeMessage(errorMessage);
        return 'error';
      });
  }


  async signOut() {
    const auth = getAuth();
    await auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.writeMessage('Signed out!');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.writeMessage(error.message);
    });
  }


  isLoggedIn() {
    const auth = getAuth();
    return auth.currentUser;
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
