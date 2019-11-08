/*
* this is small service that has functions that we are going to utilize 
* to share the state of the UI like the theme mode selected (dark or light) application wide.
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  darkModeState: BehaviorSubject<boolean>;

  constructor() { 
// TODO: if the user is signed in get the default value from Firebase
    this.darkModeState = new BehaviorSubject<boolean>(false);

  }
}
