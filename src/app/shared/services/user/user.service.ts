import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, query, ref, set } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

interface channel {
  id: string;
}

interface User {
  id: string;
  email: string;
  timestamp: number;
}

interface Account {
  id: string;
  name: string;
  surname: string;
  email: string;
  channels: channel[];
  timestamp: number;
  profile: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser = '';

  account = new BehaviorSubject<Account>({
    id: '',
    name: '',
    surname: '',
    email: '',
    channels: [],
    timestamp: 0,
    profile: ''
  });

  constructor() {
  }


  async getAccount() {
    const auth = getAuth();
    console.log(auth.currentUser?.uid);
    const db = getDatabase();
    const userRef = ref(db, 'users/');
    const userQuery = query(userRef, orderByChild('id'), equalTo(auth.currentUser?.uid || JSON.parse(localStorage.getItem('user') || '{}').uid));

    onValue(userQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(data)[0];
        this.account.next(data[key]);
      } else {
        console.log('User not found');
      }
    });
  };


  /**
   * Dedicated function for getting the user name & surname from the database.
   * @param userId as string
   * @returns name and surname of user as one string
   */
  async getUser(userId: string) {
  const db = getDatabase();
  const userRef = ref(db, 'users/');
  const userQuery = query(userRef, orderByChild('id'), equalTo(userId));

  return new Promise<String>((resolve, reject) => {
    onValue(userQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(data)[0];
        resolve(data[key].name + ' ' + data[key].surname);
      } else {
        reject('User not found');
      }
    }, {
      onlyOnce: true
    });
  });
}


  async createUser(user: User) {
  const db = getDatabase();
  const userRef = ref(db, 'users/' + user.id);

  await set(userRef, {
    id: user.id,
    name: '',
    surname: '',
    email: user.email,
    channels: [],
    timestamp: user.timestamp,
    profile: 'gs://db-bubble.appspot.com/giant-tree-frog-942682_640.jpg' // default profile picture
  });
}
}
