import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { DirectmessagesService } from 'src/app/shared/services/directmessages/directmessages.service';
import { MessageService } from 'src/app/shared/services/message/message.service';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
  directmessage?: string;
  thread?: string;
  isThread?: boolean;
}

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {

  message: string = '';
  @Input() origin: string = '';
  @Input() id: string = '';

  constructor(
    private ms: MessageService,
    private dm: DirectmessagesService,
    private auth: AuthService
    ) { }


  sendMessage(origin: string) {
    if (origin === 'channel') {
      this.ms.writeMessage({
        content: this.message,
        sender: this.auth.isLoggedIn()?.uid,
        timestamp: Date.now(),
        channel: this.id,
        isThread: false
      })
      this.message = '';
    } else if (origin === 'directmessage'){
      this.dm.writeMessage({
        content: this.message,
        sender: this.auth.isLoggedIn()?.uid,
        timestamp: Date.now(),
        directmessage: this.id,
        isThread: false
      })
      this.message = '';
    } else {
      this.ms.writeMessage({
        content: this.message,
        sender: this.auth.isLoggedIn()?.uid,
        timestamp: Date.now(),
        thread: this.id,
        isThread: false
      })
      this.message = '';
      this.ms.upgradeToThread(this.id);
    }
  }

}
