import { Injectable } from '@angular/core';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, push, query, ref } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { ChannelService } from '../channel/channel.service';
import { AuthService } from '../authentication/auth.service';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages = new BehaviorSubject<Message[]>([
    {
      content: 'They may take our data, but they\'ll never take our freedom!',
      sender: 'William Wallace',
      timestamp: 0
    }
  ]);

  constructor(
    private cs: ChannelService,
    private auth: AuthService
  ) { }


  async getMessages(channelId: string) {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages/');
    const messagesQuery = query(messagesRef, orderByChild('channel'), equalTo(channelId), limitToLast(20));

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

    await push(reference, {
      content: message.content,
      sender: this.auth.isLoggedIn()?.uid,
      timestamp: message.timestamp,
      channel: this.cs.id.value
    });
  }

}
