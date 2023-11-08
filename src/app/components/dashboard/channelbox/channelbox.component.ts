import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  

  channel!: Channel;

  origin: string = 'channel';
  channelId: string = '';

  constructor(
    public ts: ToggleService,
    public cs: ChannelService,
    public ms: MessageService,
    private route: ActivatedRoute)
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
    console.log('ChannelboxComponent destroyed');
    channelSub.unsubscribe();
  }

}
