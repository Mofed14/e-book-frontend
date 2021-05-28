import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  rateform: any;
  rates: any;
  userId: any;
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}
  userid = localStorage.getItem('userData');
  books: any;
  error: any;
  closeResult = '';
  bookid: any;
  bookdata: any;
  currentRate = 5;
  url = 'https://joberapp.net/e-library/';
  public isCollapsed = false;

  ngOnInit(): void {
    this.getuserbooks();
    this.formrate();
  }

  // tslint:disable-next-line:typedef
  getuserbooks() {
    this.api.getUserBooksByUserId(this.userid).subscribe((res) => {
      if (res.error === 404) {
        this.error = res.error;
        this.message.info('You don`t have any books ');
      } else if (res.success === true) {
        this.books = res.books;
        if (this.books.length === 1) {
          this.notification.blank('Rate Now', 'Please rate this book');
        } else if (this.books.length > 1) {
          this.notification.blank('Rate Now', 'Please rate these books');
        }
      } else {
        console.log(res);
      }
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

  getbookbybookid(bookid) {
    this.api.getbookbybookid(bookid).subscribe((res) => {
      this.bookdata = res.bookdata;
      this.bookid = bookid;
    });
  }

  ///// add rate /////////
  formrate() {
    this.rateform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      book_id: this.bookid,
      rate: this.currentRate,
    });
  }

  addrate() {
    // why I put formrate() here and i put in ngOnInit ?
    // because in ngOnInit will work when the project open in the first time and wil take the static value
    // because here will work when user click button and will take the second value i want
    this.formrate();
    const body = {
      user_id: this.rateform.value.user_id,
      book_id: this.rateform.value.book_id,
      rate: this.rateform.value.rate,
    };
    console.log(body);

    this.api.userRate(body).subscribe((res) => {
      console.log(res);
      if (res.error === 400) {
        this.notification.error('error', 'Bad request info');
      } else if (res.error === 422) {
        this.notification.info('', 'You already rated this book');
      } else if (res.success === true) {
        this.notification.success('', 'You successfully rated book');
        this.getrates(this.bookid); // to get rates automatic and show reviews when add rate
      } else {
        console.log(res);
      }
    });
  }
  ///// add rate ///////////

  ///// get rates ///////////
  getrates(bookid) {
    this.api.getBookRatingByBookid(bookid).subscribe((res) => {
      if (res.error === 500) {
        this.notification.info('', 'This book doesn`t have any rate');
      } else if (res.success === true) {
        this.rates = res.books.length;
      } else {
        console.log(res);
      }
    });
  }
  ///// get rates ///////////
}
