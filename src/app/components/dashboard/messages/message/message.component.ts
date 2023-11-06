import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

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
export class MessageComponent implements OnInit {

  @Input() message: Message = {
    content: 'They may take our data, but they\'ll never take our freedom!',
    sender: 'William Wallace',
    timestamp: 0
  };

  user = new BehaviorSubject<any>('');

  constructor(private us: UserService) {
  }

  async ngOnInit() {
    if (this.message.sender != 'William Wallace') {
      this.getUser(this.message.sender!);
    }
  }

  getUser(userId: string) {
    this.us.getUser(userId).then(userName => {
      this.user.next(userName);
    }).catch(error => {
      console.error('Failed to get user data', error);
      this.user.next('Unknown User'); // fallback in case of an error
    });
  }

}
