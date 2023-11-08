import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { DirectmessagesService } from 'src/app/shared/services/directmessages/directmessages.service';
import { UserService } from 'src/app/shared/services/user/user.service';

let channelSub: Subscription;
let directmessageSub: Subscription;

interface Channels {
  [key: string]: Channel;
}

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

interface Directmessage {
  [key: string]: {
    members: { [id: string]: boolean };
    timestamp: string;
  };
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
    public ds: DatabaseService,
    private us: UserService,
    private router: Router
  ) { }


  async ngOnInit() {
    this.getChannelNamesAndIds();
    this.getDirectMessageNamesAndIds();
    this.us.getContacts();
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


  async getDirectMessageNamesAndIds() {
    const auth = getAuth();
    const uid: string = auth.currentUser?.uid || JSON.parse(localStorage.getItem('user') || '{}').uid;
    await this.ds.readAllDirectMessages();

    this.directmessages = this.ds.directmessageSubject.pipe(
      map((data: { [key: string]: { members: { [id: string]: boolean }, timestamp: string } }) => {
        Object.keys(data).map(key => ({
          key: key,
          members: data[key].members,
          timestamp: data[key].timestamp
        }))
      })
    );
  }


  openChannel(chanId: string) {
    this.router.navigate(['/dashboard/channel', chanId]);
  }


  openDirectMessage(dmId: string) {
    this.router.navigate(['/dashboard/directmessage', dmId]);
  }


}
