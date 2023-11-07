import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from '../../../dialogs/add-channel-dialog/add-channel-dialog.component';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { Router } from '@angular/router';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {

  @ViewChild('drawer') drawer: any;

  constructor(
    public dialog: MatDialog,
    private ds: DatabaseService,
    public rs: ResizeService,
    private router: Router,
    public ts: ToggleService) {}


  ngAfterViewInit() {
    // Automatically toggle sidenav on page load.
    setTimeout(() => {
      this.drawer.toggle();
      this.ts.toggled = true;
      this.ts.drawer = this.drawer;
    }, 1000);
  }


  openThreads() {
    this.router.navigate(['/dashboard/threads']);
  }


  openContacts() {
    this.router.navigate(['/dashboard/contacts']);
  }


  openAccount() {
    this.router.navigate(['/dashboard/account']);
  }


  openDialogChannel(): void {
    const dialogRef = this.dialog.open(AddChannelDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {return} // If the user clicks cancel, do nothing.
      let id = "channel-" + Math.random().toString(36).substring(2, 15);
      this.ds.writeChannelData(id, result.name, result.description, result.members, result.timestamp);
    });
  }
}
