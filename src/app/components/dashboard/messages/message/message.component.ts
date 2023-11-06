import { Component, Input } from '@angular/core';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message: Message = {
    content: 'They may take our data, but they\'ll never take our freedom!',
    sender: 'William Wallace',
    timestamp: 0
  };

  constructor() { }

}
