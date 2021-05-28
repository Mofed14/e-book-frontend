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
      console.log(this.booksIds);
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

  form() {
    this.buyform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      books: [this.booksIds],
    });
  }

  buybook() {
    const body = {
      user_id: this.buyform.value.user_id,
      books: [this.buyform.value.book_id],
    };
    this.api.buyBook(body).subscribe((res) => {
      if (res.error === 422) {
        this.message.info(
          'You doesn`t have enough balance or You already have this book in your library'
        );
        this.message.warning(
          'Pleace check if you have balance or you have this book'
        );
      } else if (res.success === true) {
        this.message.success('user successfully purchased book');
        this.router.navigate(['/']);
        localStorage.removeItem(localStorage.getItem('userData'));
      } else {
        console.log(res);
      }
    });
  }
}
