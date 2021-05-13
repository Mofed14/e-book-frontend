import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './search.css'],
})
export class HomepageComponent implements OnInit {
  buyform: any;
  constructor(private api: ApiService, private toastr: ToastrService) {}
  books: any;
  searchText;
  limit = 8;
  items: any;
  value = 1;

  bookid: any;

  ngOnInit(): void {
    this.listAllBooks(this.limit);
    // this.form();
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      if (res.books.length) {
        this.books = res.books;
        // console.log(this.books);
        // console.log(this.books.title);
      } else {
        this.toastr.warning('No books yet');
      }
    });
  }

  // tslint:disable-next-line:typedef
  getMore() {
    this.books.push(this.listAllBooks((this.limit += 8)));
    // console.log(this.books.push(this.listAllBooks(this.limit + 8)));
  }

  // tslint:disable-next-line:typedef
  getless() {
    this.books.push(this.listAllBooks((this.limit -= 8)));
    // console.log(this.books.push(this.listAllBooks(this.limit + 8)));
  }

  // tslint:disable-next-line:typedef
  // form() {
  //   this.buyform = this.fb.group({
  //     user_id: [localStorage.getItem('userData')],
  //     book_id: [this.bookid],
  //   });
  // }

  // tslint:disable-next-line:typedef
  // buyboo() {
  //   const body = {
  //     user_id: this.buyform.value.user_id,
  //     book_id: this.buyform.value.book_id,
  //   };
  //   console.log(body);

  //   this.api.buyBook(body).subscribe((res) => {
  //     console.log(body);
  //     console.log(res);
  //   });
  // }
}
