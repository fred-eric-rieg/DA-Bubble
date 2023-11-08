import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectmessagesService } from 'src/app/shared/services/directmessages/directmessages.service';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';


interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
}

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.rs.screenWidth = window.innerWidth;
  }

  origin: string = 'directmessage';
  dmId: string = '';

  constructor(
    private route: ActivatedRoute,
    public dm: DirectmessagesService,
    public ts: ToggleService,
    public rs: ResizeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dmId = params['id'];
      this.dm.getMessages(params['id']);
    });
  }

  ngOnDestroy() {
    console.log('DMcomponent destroyed');
  }
}
