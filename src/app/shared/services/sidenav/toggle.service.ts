import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  toggled = false; // Used to toggle the sidenav

  constructor() { }
}
