/**
 * @desc Service for passing the current channel to the channelbox component.
 * @example User clicks on a channel in the sidenav component. The channel id is passed
 * into the loadChannel() method of this channel service. This method subscribes to the
 * BehaviorSubject in the database service that stores all channels.
 * The list of channels is filtered for the channel that matches the id passed in as a
 * parameter. The channel is then stored as a BehaviorSubject called currentChannel.
 */

import { Injectable, OnDestroy } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { BehaviorSubject, Subscription } from 'rxjs';

let channelSub: Subscription;

interface Channels {
  [key: string]: Channel;
}

interface Channel {
  name?: string;
  description?: string;
  members?: string[];
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnDestroy {

  currentChannel = new BehaviorSubject<Channel>({});
  id = new BehaviorSubject<string>('');

  constructor(private db: DatabaseService) { }

  ngOnDestroy() {
    channelSub.unsubscribe();
  }


  /**
   * Subscribes to all channels in the database and filters out the channel that
   * matches the id passed in as a parameter. The channel is then stored in the
   * currentChannel property.
   * @param id as string
   */
  loadChannel(id: string) {
    channelSub = this.db.channelSubject.subscribe((data: Channels) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === id) {
            this.id.next(id);
            this.currentChannel.next(data[key]);
          }
        }
      }
    });
  }
}
