import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './search.css'],
})
export class HomepageComponent implements OnInit {
  books: any;
  limit = 8;
  items: any;
  searchText;
  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.listAllBooks(this.limit);
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      if (res.books.length) {
        this.books = res.books;
        console.log(this.books.length);
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
}
