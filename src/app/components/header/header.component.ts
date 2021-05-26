import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { NzIconService } from 'ng-zorro-antd/icon';

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
  lsbooks: [];
  old: any;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private api: ApiService,
    public data: DataService,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
  }

  // toggle in the small screens
  isOpen = false;

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    this.listAllBooks(this.limit);
    // this.addbookstocart();
  }
  ////////// logout ///////////////

  // tslint:disable-next-line:typedef
  logout() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
      this.router.navigate(['/']);
      this.message.success('Successfully logout');
    }
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      this.books = res.books;
      this.array = res.books;
    });
  }

  // tslint:disable-next-line:typedef
  search() {
    const res = [];
    this.books = this.array;
    this.books.map((book) => {
      if (book.title.includes(this.input) || book.price.includes(this.input)) {
        res.push(book);
      }
    });
    this.books = res;
  }

  // addbookstocart() {
  //   // this.data.addbookstocart();
  //   this.lsbooks = this.data.storagebooks;
  // }

  // removelocalstorage() {
  //   localStorage.removeItem(localStorage.getItem('userData'));
  //   this.lsbooks = [];
  //   // this.listAllBooks(this.limit);
  //   this.router.navigate(['/']);
  // }
}
