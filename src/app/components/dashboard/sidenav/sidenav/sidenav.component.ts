import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from '../../../dialogs/addchannel/add-channel-dialog/add-channel-dialog.component';
import { DatabaseService } from 'src/app/shared/services/database/database.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  showFiller = false;
  toggled = false;

  constructor(public dialog: MatDialog, private ds: DatabaseService) { }


  openDialogChannel(): void {
    const dialogRef = this.dialog.open(AddChannelDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = "channel-" + Math.random().toString(36).substring(2, 15);
      this.ds.writeChannelData(id, result.name, result.description, result.members, result.timestamp);
    });
  }
}
