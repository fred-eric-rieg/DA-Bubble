import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, query, ref, set, update } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

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

  constructor(private ss: StorageService) {
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

  /**
   * Before updating the picture, we check if the file is a picture and if it's size is lower than 1MB.
   * Then the metadata as well as the path are set and send to the storage service.
   * The path is then returned async and updated in the user's realtime database.
   */
  async updatePicture(picture: File, accountId: string) {
    if (picture.size > 1000000) {
      this.writeMessage('File size must be lower than 1MB');
      return;
    }
    if (picture.type != 'image/jpg' && picture.type != 'image/jpeg' && picture.type != 'image/png') {
      this.writeMessage('File type must be .jpg .jpeg or .png');
      return;
    }

    const metadata = { contentType: picture.type };
    let ending = picture.type.split('/')[1];
    let path = '';
    path = await this.ss.uploadPicture(picture, 'users/' + accountId + '/profile.' + ending , metadata);


    const db = getDatabase();
    const userRef = ref(db, 'users/' + accountId);

    await update(userRef, {
      profile: path
    }).then(() => {
      this.writeMessage('Picture updated!');
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
