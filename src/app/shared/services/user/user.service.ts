import { Injectable } from '@angular/core';
import { getAuth, sendEmailVerification, updateEmail } from '@angular/fire/auth';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, query, ref, set, update } from '@angular/fire/database';
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

  contacts = new BehaviorSubject<Account[]>([]);

  constructor() {
  }


  async getContacts() {
    const auth = getAuth();
    const db = getDatabase();
    const userRef = ref(db, 'users/');
    const userQuery = query(userRef, orderByChild('id') ,limitToLast(10));

    onValue(userQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let contacts: Account[] = [];
        for (let key in data) {
          if (data[key].id != auth.currentUser?.uid) {
            contacts.push(data[key]);
          }
        }
        this.contacts.next(contacts);
      } else {
        console.log('Contacts not found');
      }
    });
  }


  async getAccount() {
    const auth = getAuth();
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

    return new Promise<Account>((resolve, reject) => {
      onValue(userQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const key = Object.keys(data)[0];
          resolve(data[key]);
        } else {
          reject('User not found');
        }
      });
    });
  }


  async createUser(user: User) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.id);

    // funny random names
    let funnyRandomName = ['Misterious', 'Funny', 'Crazy', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad', 'Silly', 'Clever', 'Smart', 'Dumb', 'Stupid', 'Crazy', 'Lazy', 'Sleepy', 'Hungry', 'Angry', 'Happy', 'Sad'];
    let funnyRandomSurname = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    let name = funnyRandomName[Math.floor(Math.random() * funnyRandomName.length)];
    let surname = funnyRandomSurname[Math.floor(Math.random() * funnyRandomSurname.length)];

    await set(userRef, {
      id: user.id,
      name: name,
      surname: surname,
      email: name.toLowerCase() + '@' + surname.toLowerCase() + '.com',
      channels: [],
      timestamp: user.timestamp,
      profile: 'https://firebasestorage.googleapis.com/v0/b/db-bubble.appspot.com/o/giant-tree-frog-942682_640.jpg?alt=media&token=c3489da1-2462-4486-8e01-b370996c35f5' // default profile picture
    });
  }


  async updateAccount(account: Account) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + account.id);

    await update(userRef, {
      name: account.name,
      surname: account.surname,
    }).then(() => {
      this.writeMessage('Account updated!');
    }).catch((error) => {
      this.writeMessage(error.message);
    });
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
