import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    public authService: AuthService,
    private router: Router) { }

  logOut() {
    this.authService.signOut();
  }
}
