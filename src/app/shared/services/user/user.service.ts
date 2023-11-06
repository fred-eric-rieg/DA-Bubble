import { Injectable } from '@angular/core';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, query, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor() { }


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
}
