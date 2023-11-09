import { Injectable } from '@angular/core';
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, push, query, ref, update } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { ChannelService } from '../channel/channel.service';
import { AuthService } from '../authentication/auth.service';

interface Message {
  id?: string;
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
  thread?: string;
  isThread?: boolean;
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

  threads = new BehaviorSubject<Message[]>([
    
  ]);

  constructor(
    private cs: ChannelService,
    private auth: AuthService
  ) { }

  /**
   * Get all threads from the database. Used in Threads, if no specific thread is selected.
   */
  async getAllThreads() {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages/');
    const messagesQuery = query(messagesRef, orderByChild('isThread'), equalTo(true), limitToLast(20));

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let messages: Message[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            element.id = key;
            messages.push(element);
          }
        }
        this.threads.next(messages);
      } else {
        this.threads.next([]);
      }
    });
  }

  /**
   * Get a single thread from database. Used in Threads, if a specific thread is selected.
   * @param threadId as string
   */
  async getThread(threadId: string) {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages/');
    const messagesQuery = query(messagesRef, orderByChild('thread'), equalTo(threadId), limitToLast(20));

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let messages: Message[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            element.id = key;
            messages.push(element);
          }
        }
        this.threads.next(messages);
      } else {

      }
    });
  }


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
            element.id = key;
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
      sender: message.sender,
      timestamp: message.timestamp,
      channel: message.channel || null,
      thread: message.thread || null,
      isThread: message.isThread || null
    });
  }

  /**
   * Updates a message to become a thread starting point.
   * @param threadId as string
   */
  async upgradeToThread(threadId: string) {
    const db = getDatabase();
    const reference = ref(db, 'messages/' + threadId);

    await update(reference, {
      thread: threadId,
      isThread: true
    });
  }


  async countReplies(threadId: string) {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages/');

    const messagesQuery = query(messagesRef, orderByChild('thread'), equalTo(threadId));

    let replies = 1;

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        replies = 0;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            element.id = key;
            replies++;
          }
        }
        replies--; // Because the thread itself is also counted.
      }
    });

    return replies;
  }
}
