import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, query, ref, set } from '@angular/fire/database';

interface channel {
  id: string;
}

interface User {
  id: string;
  email: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser = '';

  constructor() { }


  /**
   * Dedicated function for getting the user name & surname from the database.
   * @param userId as string
   * @returns name and surname of user as one string
   */
  async getUser(userId: string) {
    const db = getDatabase();
    const userRef = ref(db, 'users/');
    const userQuery = query(userRef, orderByChild('id'), equalTo(userId));

    return new Promise((resolve, reject) => {
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
