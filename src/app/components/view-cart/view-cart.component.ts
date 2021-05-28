import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  offsetTop = 10;
  nzOffsetBottom = 10;
  buyform: any;
  booksIds: any;
  Ids: any;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getbooksfromlocalstorage();
    this.setOffsetTop();
    this.form();
  }

  setOffsetTop(): void {
    this.offsetTop += 70;
  }

  getbooksfromlocalstorage() {
    if (JSON.parse(localStorage.getItem(localStorage.getItem('userData')))) {
      this.storagebooks = JSON.parse(
        localStorage.getItem(localStorage.getItem('userData'))
      );
      this.booksIds = this.storagebooks.map((res) => {
        this.books = res;
        return (this.Ids = this.books.id);
      });
    } else {
      this.message.error('Your cart is empty');
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
        this.router.navigate(['/']);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  form() {
    this.buyform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      books: [],
    });
  }

  buybook() {
    const body = {
      user_id: this.buyform.value.user_id,
      books: this.booksIds,
    };
    console.log(body);

    this.api.buyBook(body).subscribe((res) => {
      if (res.error === 422) {
        this.message.info('You don`t have enough balance');
      } else if (res.success === true) {
        this.message.success('user successfully purchased book');
        localStorage.removeItem(localStorage.getItem('userData'));
        this.router.navigate(['/']);
      } else {
        console.log(res);
      }
    });
  }
}
