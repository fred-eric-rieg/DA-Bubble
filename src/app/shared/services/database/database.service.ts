import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

interface Channels {
  [key: string]: Channel;
}

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userData: any = [];
  channelSubject = new BehaviorSubject<Channels>({});
  messageData: any = [];

  constructor() { }

  /**
   * Wirtes (new) user data to database (and overwrites existing data).
   * @param userId as string
   * @param name as string
   * @param email as string
   * @param imageUrl as string path
   */
  async writeUserData(userId: string, name: string, email: string, imageUrl: string) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    await set(reference, {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }


  async readUserData(userId: string) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.userData.push(data);
      console.log(this.userData);
    });
  }


  async writeChannelData(id: string, name: string, description: string, members: string[], timestamp: number) {
    const db = getDatabase();
    const reference = ref(db, 'channels/' + id);

    await set(reference, {
      name: name,
      description: description,
      members: members,
      timestamp: timestamp
    });
  }


  async readAllChannels() {
    const db = getDatabase();
    const reference = ref(db, 'channels/');

    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      this.channelSubject.next(data);
    });
  }
}
