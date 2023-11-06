import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {


  screenWidth!: number;

  constructor() {
    this.screenWidth = window.innerWidth;
  }
}
