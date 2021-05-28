import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './search.css'],
})
export class HomepageComponent implements OnInit {
  book: any;
  userbooks: any;
  userbook: any;
  localbooksids: any;
  user: any;
  balances: any;
  formBalnce: any;
  addfundsform: any;
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private modal: NzModalService,
    public dataservice: DataService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}
  buyform: any;
  rates: any;
  array = [];
  bookid: any;
  forms: any;
  books: any;
  searchText;
  limit = 16;
  items: any;
  value = 5;
  closeResult = '';
  keybookdata = localStorage.getItem('userData');
  data;
  url = 'https://joberapp.net/e-library/';
  userid = localStorage.getItem('userData');
  offsetTop = 10;

  private subject = new Subject<any>();

  ngOnInit(): void {
    this.listAllBooks(this.limit);
    this.getuserbooks();
    this.getBlance();
    this.formfunds();
    this.setOffsetTop();
  }

  setOffsetTop(): void {
    this.offsetTop += 70;
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      if (res.books.length) {
        this.books = res.books;
        this.array = res.books.map((result) => {
          this.bookid = result.id;
        });
      } else {
        this.message.warning('No books yet');
      }
    });
  }

  // tslint:disable-next-line:typedef
  getMore() {
    this.books.push(this.listAllBooks((this.limit += 16)));
    // console.log(this.books.push(this.listAllBooks(this.limit + 8)));
  }

  // tslint:disable-next-line:typedef
  getless() {
    this.books.push(this.listAllBooks((this.limit -= 16)));
    // console.log(this.books.push(this.listAllBooks(this.limit + 8)));
  }

  showConfirm(id): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to review this book?</i>',
      nzContent: '<b>If yes, you should buy this book</b>',
      nzOnOk: () => {
        console.log('OK');
        this.router.navigate(['home/product-details/' + id]);
      },
    });
  }

  adddatatolocalstorage(event) {
    const oldobject = JSON.parse(localStorage.getItem(this.keybookdata)) || [];
    oldobject.map((res) => {
      this.localbooksids = res.id;
    });
    if (oldobject.length >= 5) {
      this.message.warning('Your cart is full');
    } else if (this.userbook === event.id) {
      this.message.info('This book has already been purchased');
    } else if (this.localbooksids === event.id) {
      this.message.info('This book is already in cart');
    } else {
      oldobject.push(event);
      localStorage.setItem(this.keybookdata, JSON.stringify(oldobject));
      this.message.success('The book added to your cart');
    }
  }

  getuserbooks() {
    this.api.getUserBooksByUserId(this.userid).subscribe((res) => {
      if (res.error === 404) {
        // this.error = res.error;
        this.message.info('You don`t have any books ');
      } else if (res.success === true) {
        this.userbooks = res.books;
        this.userbooks.map((res) => {
          this.userbook = res.book_id;
        });
      } else {
        console.log(res);
      }
    });
  }

  getBlance() {
    this.api.getBlance(this.userid).subscribe((res) => {
      this.balances = res.balance;
      console.log(this.balances);
    });
  }

  open(mofed) {
    this.modalService
      .open(mofed, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  formfunds() {
    this.addfundsform = this.fb.group({
      user_id: this.userid,
      amount: ['', Validators.required],
    });
  }

  addfunds() {
    const body = {
      user_id: this.addfundsform.value.user_id,
      amount: this.addfundsform.value.amount,
    };
    if (body.amount) {
      this.api.userAddFunds(body).subscribe((res) => {
        if (res.error === 400) {
          this.message.error('Please enter the funds');
        } else if (res.success === true) {
          this.message.success('Now you can buy any thing');
          this.getBlance();
        } else {
          console.log(res);
        }
      });
    } else {
      this.message.error('Please enter the funds');
    }
  }
}
