import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  buyform: any;
  booksIds: any;
  Ids: any;
  addfundsform: any;
  userid = localStorage.getItem('userData');
  balances: any;
  closeResult = '';

  constructor(
    private router: Router,
    private modal: NzModalService,
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getbooksfromlocalstorage();
    this.setOffsetTop();
    this.form();
    this.formfunds();
    this.getBlance();
  }

  setOffsetTop(): void {
    this.offsetTop += 70;
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

  getBlance() {
    this.api.getBlance(this.userid).subscribe((res) => {
      this.balances = res.balance;
      console.log(this.balances);
    });
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
