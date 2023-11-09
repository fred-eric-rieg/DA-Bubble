import { Pipe, PipeTransform } from '@angular/core';

interface Message {
  content?: string;
  sender?: string;
  timestamp?: number;
  channel?: string;
}

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: Message[] | null, ...args: string[]): Message[] | [] {
    if ( !value ) { return [] }

    let days: Message[] = [];
    if (args[0] == 'today') {
      let today = Date.now();
      let start = new Date(today).setHours(0,0,0,0);
      value.forEach((message: Message) => {
        if ( Number(message.timestamp) >= start ) { days.push(message) }
      });
      return days;
    } else if ( args[0] == 'yesterday' ) {
      let yesterday = Date.now() - 86400000;
      // get midnight of yesterday
      let start = new Date(yesterday).setHours(0,0,0,0);
      console.log(start);
      // get start of yesterday
      let end = new Date(Date.now()).setHours(0,0,0,0);
      console.log(end);
      value.forEach((message: Message) => {
        if ( Number(message.timestamp) >= start && Number(message.timestamp) < end) { days.push(message) }
      });
      return days;
    } else if ( args[0] == 'before' ) {
      let before = Date.now() - 86400000;
      // get start of yesterday
      let start = new Date(before).setHours(0,0,0,0);
      value.forEach((message: Message) => {
        if ( Number(message.timestamp) < start ) { days.push(message) }
      });
      return days;
    } else {
      return [];
    }
  }

}
