import { Component } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message/message.service';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
}

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {

  message: string = '';

  constructor(private ms: MessageService) { }


  sendMessage() {
    console.log(this.message);
    this.ms.writeMessage({
      content: this.message,
      sender: 'William Wallace',
      timestamp: Date.now(),
      channel: ''
    })
    this.message = '';
  }

}
