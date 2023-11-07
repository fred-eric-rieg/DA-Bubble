import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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


  constructor(public us: UserService) {
    this.us.getAccount();
    this.accSub = this.us.account.subscribe((account) => {
      this.account = account;
      console.log(this.account);
    });
  }


  ngOnDestroy(): void {
      this.accSub.unsubscribe();
  }


  editAccount() {

  }
  
}
