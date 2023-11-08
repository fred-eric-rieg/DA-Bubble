import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../services/user/user.service';

interface FlatFilteredDM {
  key: string;
  members: string;
  timestamp: string;
}

interface NamedDM {
  key: string;
  profile: string;
  name: string;
  members: string;
  timestamp: string;
}

@Pipe({
  name: 'dmname'
})
export class DmnamePipe implements PipeTransform {

  constructor(private us: UserService) { }

  transform(directmessage: Array<FlatFilteredDM> | []): Array<NamedDM> | [] {
    if (!directmessage) return [];

    const namedDMs: NamedDM[] = [];
    for(let i = 0; i < directmessage.length; i++) {
      namedDMs.push(
        {
          key: directmessage[i].key,
          profile: this.getProfile(directmessage[i].members),
          name: this.getName(directmessage[i].members),
          members: directmessage[i].members,
          timestamp: directmessage[i].timestamp
        });
    }
    return namedDMs;
  }

  getName(id: string): string {
    let name = '';
    let contactSub = this.us.contacts.subscribe(contacts => {
      contacts.forEach(contact => {
        if (contact.id == id) {
          name = contact.name + ' ' + contact.surname;
        }
      });
    });
    contactSub.unsubscribe();
    return name;
  }


  getProfile(id: string): string {
    let profile = '';
    let contactSub = this.us.contacts.subscribe(contacts => {
      contacts.forEach(contact => {
        if (contact.id == id) {
          profile = contact.profile;
        }
      });
    });
    contactSub.unsubscribe();
    return profile;
  }

}
