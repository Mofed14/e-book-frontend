import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  storagebooks: [];
  books: any;
  empty: any;
  full: any;
  url = 'https://joberapp.net/e-library/';

  constructor(private router: Router, private modal: NzModalService) {}

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
      this.empty = this.storagebooks;
    }
  }

  removelocalstorage() {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        localStorage.removeItem(localStorage.getItem('userData'));
        this.getbooksfromlocalstorage();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
