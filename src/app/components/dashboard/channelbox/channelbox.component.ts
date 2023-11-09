import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChannelService } from 'src/app/shared/services/channel/channel.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';

let channelSub: Subscription;

interface Channel {
  name?: string;
  description?: string;
  members?: string[];
  timestamp?: number;
}

interface Message {
  id?: string;
  content?: string;
  sender?: string;
  timestamp?: number;
}

@Component({
  selector: 'app-channelbox',
  templateUrl: './channelbox.component.html',
  styleUrls: ['./channelbox.component.scss']
})
export class ChannelboxComponent implements OnInit {

  today: number = Date.now();
  yesterday: number = Date.now() - 86400000;
  before: number = new Date(Date.now() - 86400000 * 2).setHours(0,0,0,0);

  channel!: Channel;

  origin: string = 'channel';
  channelId: string = '';

  constructor(
    public ts: ToggleService,
    public cs: ChannelService,
    public ms: MessageService,
    private route: ActivatedRoute,
    private router: Router)
  {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.cs.loadChannel(params['id']);
      this.ms.getMessages(params['id']);
    });
    channelSub = this.cs.currentChannel.subscribe((data: Channel) => {
      this.channel = data;
    });
  }

  ngOnDestroy() {
    channelSub.unsubscribe();
  }


  replyInThread(message: Message) {
    console.log("Opening message: ", message);
    this.router.navigate(['/dashboard/threads', message.id]);
  }

}
