import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database/database.service';

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

interface Message {
  content: string;
  sender: string;
  timestamp: number;
}

@Component({
  selector: 'app-channelbox',
  templateUrl: './channelbox.component.html',
  styleUrls: ['./channelbox.component.scss']
})
export class ChannelboxComponent {

  activeChannel: Channel = {
    name: '',
    description: '',
    members: [],
    timestamp: 0
  };

  messages: Message[] = [];

  constructor(public databaseService: DatabaseService) {
  }


}
