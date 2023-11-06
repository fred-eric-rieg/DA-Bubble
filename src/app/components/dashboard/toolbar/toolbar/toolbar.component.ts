import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { ToggleService } from 'src/app/shared/services/sidenav/toggle.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user = new BehaviorSubject<any>('');

  constructor(
    public authService: AuthService,
    public ts: ToggleService,
    private us: UserService
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser(user.uid);
  }

  logOut() {
    this.authService.signOut();
  }


  getUser(userId: string) {
    this.us.getUser(userId).then(userName => {
      this.user.next(userName);
    }).catch(error => {
      console.error('Failed to get user data', error);
      this.user.next('Misterious X'); // fallback in case of an error
    });
  }
}
