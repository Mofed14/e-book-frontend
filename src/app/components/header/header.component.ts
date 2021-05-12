import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logo = '../assets/images/logo.png';
  books: any;
  element: any;
  limit = 24;
  input: any;
  array: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService
  ) {}

  // toggle in the small screens
  isOpen = false;

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    this.listAllBooks(this.limit);
  }
  ////////// logout ///////////////

  // tslint:disable-next-line:typedef
  logout() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
      this.router.navigate(['/']);
      this.toastr.success('Successfully logout');
    }
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      this.books = res.books;
      this.array = res.books;
      console.log(this.books);
    });
  }

  // tslint:disable-next-line:typedef
  search() {
    const res = [];
    this.books = this.array;
    this.books.map((book) => {
      if (book.title.includes(this.input) || book.price.includes(this.input)) {
        res.push(book);
        console.log(book);
      }
    });
    this.books = res;
  }
}
