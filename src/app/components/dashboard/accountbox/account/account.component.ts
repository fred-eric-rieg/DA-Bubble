import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditAccountComponent } from 'src/app/components/dialogs/edit-account/edit-account.component';
import { EditPictureComponent } from 'src/app/components/dialogs/edit-picture/edit-picture/edit-picture.component';
import { UserService } from 'src/app/shared/services/user/user.service';

interface Account {
  id: string;
  name: string;
  surname: string;
  email: string;
  channels: channel[];
  timestamp: number;
  profile: string;
}

interface channel {
  id: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnDestroy {

  accSub: Subscription = new Subscription();

  account: Account = {
    id: '',
    name: '',
    surname: '',
    email: '',
    channels: [],
    timestamp: 0,
    profile: ''
  };


  constructor(
    public us: UserService,
    public dialog: MatDialog
  ) {
    this.us.getAccount();
    this.accSub = this.us.account.subscribe((account) => {
      this.account = account;
    });
  }


  ngOnDestroy(): void {
    this.accSub.unsubscribe();
  }


  openEditAccountDialog(): void {
    const dialogRef = this.dialog.open(EditAccountComponent, {
      width: '300px',
      data: this.account
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return } // If the user clicks cancel, do nothing.
      this.us.updateAccount(result);
    });
  }


  openEditPictureDialog(): void {
    const dialogRef = this.dialog.open(EditPictureComponent, {
      width: '300px',
      data: this.account.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return } // If the user clicks cancel, do nothing.
      this.us.updatePicture(result, this.account.id);
    });
  }

}
