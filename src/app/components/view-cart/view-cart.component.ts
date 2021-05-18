import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  storagebooks: [];
  books: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getbooksfromlocalstorage();
  }

  getbooksfromlocalstorage() {
    if (JSON.parse(localStorage.getItem(localStorage.getItem('userData')))) {
      this.storagebooks = JSON.parse(
        localStorage.getItem(localStorage.getItem('userData'))
      );
    } else {
      this.storagebooks = [];
      this.router.navigate(['../home']);
    }
  }
}
