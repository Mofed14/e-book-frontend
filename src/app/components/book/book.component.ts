import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  userid = localStorage.getItem('userData');
  books: any;
  error: any;
  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getuserbooks();
  }

  // tslint:disable-next-line:typedef
  getuserbooks() {
    this.api.getUserBooksByUserId(this.userid).subscribe((res) => {
      if (res.error === 404) {
        this.error = res.error;
        this.toastr.info('You don`t have any books ');
      } else if (res.success === true) {
        this.books = res.books;
      } else {
        console.log(res);
      }
    });
  }
}
