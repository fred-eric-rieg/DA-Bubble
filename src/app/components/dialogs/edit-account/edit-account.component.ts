import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  profile: string;
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {


  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: User) {
  }


}
