import { Pipe, PipeTransform } from '@angular/core';
import { getAuth } from '@angular/fire/auth';

interface Directmessage {
  [key: string]: {
    members: { [id: string]: boolean };
    timestamp: string;
  };
}

interface FilteredDM {
  [key: string]: {
    members: string;
    timestamp: string;
  };
}

@Pipe({
  name: 'dmpipe'
})
export class DmpipePipe implements PipeTransform {

  transform(directMessages: Directmessage | null): FilteredDM | null {
    if (!directMessages) return null;

    const excludedMemberId = getAuth().currentUser?.uid;
    if (!excludedMemberId) return null;

    const filteredMessages: FilteredDM = {};
    Object.entries(directMessages).forEach(([key, value]) => {
      Object.entries(value.members).forEach(([memberId, memberValue]) => {
        if (memberId != excludedMemberId && memberValue) {
          filteredMessages[key] = { members: memberId, timestamp: value.timestamp};
        }
      });
    });
    console.log(filteredMessages);
    return filteredMessages;
  }

}
