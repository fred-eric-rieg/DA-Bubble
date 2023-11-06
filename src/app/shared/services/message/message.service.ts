import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
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
  },
  {
    content: 'They may take our data, but they\'ll never take our freedom!',
    sender: 'William Wallace',
    timestamp: 0
  },
  {
    content: 'They may take our data, but they\'ll never take our freedom!',
    sender: 'William Wallace',
    timestamp: 0
  },
  {
    content: 'Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! Eiverbübbscht nochemol! ',
    sender: 'Dieter Wallace',
    timestamp: 0
  },
  ]);

  constructor() { }
}
