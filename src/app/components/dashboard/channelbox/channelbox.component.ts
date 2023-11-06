import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChannelService } from 'src/app/shared/services/channel/channel.service';
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

  messages!: Message[];

  screenWidth!: number;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    public ts: ToggleService,
    public cs: ChannelService,
    private route: ActivatedRoute)
  {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.route.params.subscribe(params => {
      this.cs.loadChannel(params['id']);
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
