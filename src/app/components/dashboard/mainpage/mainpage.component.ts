import { Component, HostListener } from '@angular/core';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.rs.screenWidth = window.innerWidth;
  }

  constructor(
    public ts: ToggleService,
    public rs: ResizeService,
    ) { }  

}
