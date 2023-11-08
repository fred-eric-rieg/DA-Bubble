import { Pipe, PipeTransform } from '@angular/core';

interface FilteredDM {
  [key: string]: {
    members: string;
    timestamp: string;
  };
}

interface FlatFilteredDM {
  key: string;
  members: string;
  timestamp: string;
}

@Pipe({
  name: 'dmarray'
})
export class DmarrayPipe implements PipeTransform {

  transform(directmessage: FilteredDM | null): Array<FlatFilteredDM> | [] {
    if (!directmessage) return [];

    return Object.entries(directmessage).map(([key, value]) => ({
      key, // the direct message key
      ...value // the members and timestamp
    }));
  }

}
