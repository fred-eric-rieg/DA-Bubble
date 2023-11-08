import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { equalTo, get, getDatabase, limitToLast, onValue, orderByChild, push, query, ref } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../authentication/auth.service';


type Members = {
  [key: string]: boolean;
};

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
  directmessage?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DirectmessagesService {

  messages = new BehaviorSubject<Message[]>([]);


  constructor(private auth: AuthService) { }

  async getDirectMessages() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid || '';
    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');
    const dmQuery = query(dmRef, orderByChild('members'), equalTo(uid), limitToLast(20));

    const snapshot = await get(dmRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }


  async existsDirectMessage(contactId: string) {
    console.log("Checking this guy: ", contactId);
    const auth = getAuth();
    const uid = auth.currentUser?.uid || '';

    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');

    const snapshot = await get(dmRef);
    let result = null

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const dm = childSnapshot.val();
        if (dm.members && dm.members[uid] && dm.members[contactId]) {
          console.log("Found a direct message: ", snapshot.val());
          result = snapshot.val();
          return snapshot.val();
        }
      });
    } else {
      console.log("No data available");
    }
    return result;
  }


  async createDirectMessageChannel(contact: string) {
    const auth = getAuth();
    let user = auth.currentUser?.uid || '';
    if (!user) {
      throw new Error('No user is currently logged in.');
    }

    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');

    const dmMembers: Members = {};
    dmMembers[user] = true;
    dmMembers[contact] = true;

    const dm = {
      members: dmMembers,
      timestamp: Date.now()
    }

    let key = await push(dmRef, dm);

    return key.key;
  }


  async getMessages(directmessageId: string) {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages/');
    const messagesQuery = query(messagesRef, orderByChild('directmessage'), equalTo(directmessageId), limitToLast(20));

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let messages: Message[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            messages.push(element);
          }
        }
        this.messages.next(messages);
      } else {
        this.messages.next([
          {
            content: 'They may take our data, but they\'ll never take our freedom!',
            sender: 'William Wallace',
            timestamp: 0
          }
        ]);
      }
    });
  }


  async writeMessage(message: Message) {
    const db = getDatabase();
    const reference = ref(db, 'messages/');
    console.log("Writing message: ", message);

    await push(reference, {
      content: message.content,
      sender: message.sender,
      timestamp: message.timestamp,
      directmessage: message.directmessage
    });
  }

}
