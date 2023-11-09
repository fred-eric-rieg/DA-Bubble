import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.scss']
})
export class EditPictureComponent {

  image: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: any) {
  }


  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

}
