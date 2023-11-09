import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';

interface Message {
  id?: string;
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
  thread?: string;
  isThread?: boolean;
}

@Component({
  selector: 'app-threadbox',
  templateUrl: './threadbox.component.html',
  styleUrls: ['./threadbox.component.scss']
})
export class ThreadboxComponent {

  threadId: string = '';
  origin: string = 'thread';

  constructor(
    public ts: ToggleService,
    private route: ActivatedRoute,
    public ms: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.threadId = params['id'];
      if (this.threadId) {
        this.ms.getThread(this.threadId);
      } else {
        this.ms.getAllThreads();
      }
    });
  }


  replyInThread(message: Message) {
    console.log("Opening message: ", message);
    this.router.navigate(['/dashboard/threads', message.id]);
  }

}
