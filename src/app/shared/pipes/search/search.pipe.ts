import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: any, ...args: string[]): any {
    if ( !contacts ) { return null }
    
    return contacts.filter((contact: any) => {
      if ( contact.name.toLowerCase().includes(args[0].toLowerCase()) ) { return contact }
      if ( contact.surname.toLowerCase().includes(args[0].toLowerCase()) ) { return contact }
      if ( contact.email.toLowerCase().includes(args[0].toLowerCase()) ) { return contact }
    });
  }

}
