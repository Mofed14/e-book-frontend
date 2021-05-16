import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    this.addbookstocart();
  }
  storagebooks: any;
  addbookstocart() {
    this.storagebooks = JSON.parse(
      localStorage.getItem(localStorage.getItem('userData'))
    );
    // console.log(this.storagebooks);
  }
}
