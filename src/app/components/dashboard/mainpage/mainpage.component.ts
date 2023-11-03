import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  logOut() {
    this.authService.signOut();
  }

}
