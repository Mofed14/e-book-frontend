import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    this.getdatafromlocalstorage();
  }
  storagebooks: any;
  getdatafromlocalstorage() {
    this.storagebooks = JSON.parse(
      localStorage.getItem(localStorage.getItem('userData'))
    );
    // console.log(this.storagebooks);
  }
}
