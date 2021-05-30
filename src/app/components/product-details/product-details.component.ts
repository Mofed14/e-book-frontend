import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LEGACY_ID_INDICATOR } from '@angular/localize/src/utils';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  buyform: any;
  bookid: any;
  addfundsform: any;
  closeResult = '';
  bookdata: any;
  currentRate = 5;
  rateform: any;
  rates: any;
  localstorage: void;
  err: any;
  url = 'https://joberapp.net/e-library/';
  localbooks = JSON.parse(
    localStorage.getItem(localStorage.getItem('userData'))
  );
  removed: any;
  indexOfElement: number;
  result: any;
  offsetTop = 10;
  balances: any;
  userid = localStorage.getItem('userData');
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get id from url
    this.bookid = this.route.snapshot.paramMap.get('id');
    this.getbookbybookid(this.bookid);
    this.form();
    this.formfunds();
    this.formrate();
    this.getrates();
    this.setOffsetTop();
    // this.ll();
    this.getBlance();
  }

  setOffsetTop(): void {
    this.offsetTop += 70;
  }
  // ll() {
  //   this.localbooks.map((element) => {
  //     if (this.bookid === element.id) {
  //       console.log(element);
  //       console.log(this.localbooks);
  //       this.indexOfElement = this.localbooks.indexOf(element);
  //       console.log(this.indexOfElement);
  //       // splice(starting index, how many values to remove);
  //       this.result = this.localbooks.splice(this.indexOfElement, 1);
  //       console.log(this.result);
  //       console.log(this.localbooks);
  //     }
  //   });
  // }

  ///////// buy book ////////////////
  form() {
    console.log(this.bookid);

    this.buyform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      books: [],
    });
  }

  buybook() {
    const body = {
      user_id: this.buyform.value.user_id,
      books: [this.bookid],
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
        // map on the books on localstorage
        this.localbooks.map((element) => {
          // condition if the bookid of this identical the book id to anyone in localstorage
          // find the number of the index
          // after find the index delet it from array
          // the add the new array or new data to the localstorage
          if (this.bookid === element.id) {
            this.indexOfElement = this.localbooks.indexOf(element);
            // splice(starting index, how many values to remove);
            this.localbooks.splice(this.indexOfElement, 1);
            /// add the new books after detete the book i buyed
            localStorage.setItem(
              localStorage.getItem('userData'),
              JSON.stringify(this.localbooks)
            );
          }
        });

        this.message.success('user successfully purchased book');
        this.router.navigate(['/']);
      } else {
        console.log(res);
      }
    });
  }
  ///////// buy book ////////////////

  //////////// add funds ///////////
  formfunds() {
    this.addfundsform = this.fb.group({
      user_id: localStorage.getItem('userData'),
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
          this.message.success(
            `You added ${
              body.amount
            } to your account balance your balance now is ${
              Number(this.balances) + Number(body.amount)
            }`
          );
          this.getBlance();
        } else {
          console.log(res);
        }
      });
    } else {
      this.message.error('Please enter the funds');
    }
  }
  //////////// add funds ////////////

  ///////// start modal popup ///////
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
  ///////////// end modal popup //////////

  //////////// getbookbybookid ///////////
  getbookbybookid(bookid) {
    this.api.getbookbybookid(this.bookid).subscribe((res) => {
      this.bookdata = res.bookdata;
      console.log(this.bookdata.id);
    });
  }
  //////////// getbookbybookid ///////////

  //////////// addrate ///////////
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
    this.api.userRate(body).subscribe((res) => {
      if (res.error === 400) {
        this.message.info('Bad request info');
      } else if (res.error === 422) {
        this.message.warning(
          'You may already rated this book or You doesn`t have this book in your library'
        );
        this.err = res.error;
      } else if (res.success === true) {
        this.message.success('You successfully rated book');
        this.getrates(); // to get rates automatic and show reviews when add rate
      } else {
        console.log(res);
      }
    });
  }
  //////////// addrate ///////////

  //////////// geterates ///////////
  getrates() {
    this.api.getBookRatingByBookid(this.bookid).subscribe((res) => {
      if (res.error === 500) {
        this.message.info('This book doesn`t have any rate');
      } else if (res.success === true) {
        this.rates = res.books.length;
      } else {
        console.log(res);
      }
    });
  }
  //////////// geterates ///////////

  getBlance() {
    this.api.getBlance(this.userid).subscribe((res) => {
      this.balances = res.balance;
      console.log(this.balances);
    });
  }
}
