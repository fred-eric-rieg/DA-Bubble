import { Component } from '@angular/core';

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {


  data: Channel = {
    name: '',
    description: '',
    members: [],
    timestamp: Date.now()
  };
}
