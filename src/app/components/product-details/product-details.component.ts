import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  buyform: any;
  bookid: any;
  addfundsform: any;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookid = this.route.snapshot.paramMap.get('id');
    this.form();
    this.formfunds();
  }

  // tslint:disable-next-line:typedef
  form() {
    this.buyform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      book_id: this.bookid,
    });
  }

  // tslint:disable-next-line:typedef
  buybook() {
    const body = {
      user_id: this.buyform.value.user_id,
      book_id: this.buyform.value.book_id,
    };
    this.api.buyBook(body).subscribe((res) => {
      console.log(res);
      if (res.error === 422) {
        this.toastr.show(
          'You doesn`t have enough balance or You already have this book in your library'
        );
        this.toastr.warning(
          'Pleace check if you have balance or you have this book'
        );
      } else if (res.success === true) {
        this.toastr.success('user successfully purchased book');
      } else {
        console.log(res);
      }
    });
  }

  // tslint:disable-next-line:typedef
  formfunds() {
    this.addfundsform = this.fb.group({
      user_id: localStorage.getItem('userData'),
      amount: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  addfunds() {
    const body = {
      user_id: this.buyform.value.user_id,
      amount: this.buyform.value.amount,
    };

    if (body.amount) {
      this.api.userAddFunds(body).subscribe((res) => {
        if (res.error === 400) {
          this.toastr.error('Please enter the funds');
        } else if (res.success === true) {
          this.toastr.success('Now you can buy any thing');
        } else {
          console.log(res);
        }
      });
    } else {
      this.toastr.error('Please enter the funds');
    }
  }
}
