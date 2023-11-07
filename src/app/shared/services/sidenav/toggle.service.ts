import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  toggled = false; // Used to toggle the sidenav
  drawer!: any;

  constructor() { }

  toggle() {
    if (!this.drawer) {return}
    this.drawer.toggle();
    this.toggled = !this.toggled;
  }
}
