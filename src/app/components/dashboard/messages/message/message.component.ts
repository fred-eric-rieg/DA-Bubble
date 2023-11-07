import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
}

interface channel {
  id: string;
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

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message = {
    content: 'They may take our data, but they\'ll never take our freedom!',
    sender: 'William Wallace',
    timestamp: 0
  };

  user = new BehaviorSubject<Account>({
    id: '',
    name: '',
    surname: '',
    email: '',
    channels: [],
    timestamp: 0,
    profile: ''
  });

  constructor(private us: UserService) {
  }

  async ngOnInit() {
    if (this.message.sender != 'William Wallace') {
      this.getUser(this.message.sender!);
    }
  }

  getUser(userId: string) {
    this.us.getUser(userId).then(user => {
      this.user.next(user);
    }).catch(error => {
      console.error('Failed to get user data', error);
    });
  }

}
