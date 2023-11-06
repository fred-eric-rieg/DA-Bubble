import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { Subscription } from 'rxjs';
import { ChannelService } from 'src/app/shared/services/channel/channel.service';
import { Router } from '@angular/router';

let channelSub: Subscription;

interface Channels {
  [key: string]: Channel;
}

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {

  channel: any = [];
  directmessages: any = [];

  chanExpanded = false;
  dmExpanded = false;

  constructor(
    private ds: DatabaseService,
    private router: Router
    ) {}


  async ngOnInit() {
    console.log('ChannelComponent initialized');
    this.getChannelNamesAndIds();
  }

  ngOnDestroy() {
    channelSub.unsubscribe();
  }


  /**
   * Gets names and ids from all channels to display them on the buttons
   * in the sidenav.
   */
  async getChannelNamesAndIds() {
    await this.ds.readAllChannels();
    
    channelSub = this.ds.channelSubject.subscribe((data: Channels) => {
      this.channel = [];
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.channel.push(
            {
              id: key,
              name: element.name,
            }
          );
        }
      }
    });
  }


  openChannel(chanId: string) {
    this.router.navigate(['/dashboard/channel', chanId]);
  }


  openDirectMessage(dmId: string) {
    this.router.navigate(['/dashboard/directmessage', dmId]);
  }


}
