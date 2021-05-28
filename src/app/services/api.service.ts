import { Injectable } from '@angular/core';
import { url } from '../services/general';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private options = {
    headers: new HttpHeaders().set('content-type', 'application/json'),
  };

  register(body): Observable<any> {
    return this.http
      .post(url + '/api/user/register.php', body, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  login(body): Observable<any> {
    return this.http.post(url + '/api/user/login.php', body, this.options).pipe(
      map((res) => {
        return res as any;
      })
    );
  }

  buyBook(body): Observable<any> {
    return this.http.post(url + '/api/user/register_books.php', body).pipe(
      map((res) => {
        return res as any;
      })
    );
  }

  getUserBooksByUserId(userid): Observable<any> {
    return this.http
      .get(url + '/api/user/books.php?id=' + userid, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  userRate(body): Observable<any> {
    return this.http
      .post(url + '/api/user/rate_book.php', body, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  userAddFunds(body): Observable<any> {
    return this.http.post(url + '/api/user/funds.php', body, this.options).pipe(
      map((res) => {
        return res as any;
      })
    );
  }

  getAllBooks(limit): Observable<any> {
    return this.http
      .get(url + '/api/book/getall.php?limit=' + limit, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  getbookbybookid(bookid): Observable<any> {
    return this.http
      .get(url + '/api/book/book.php?id=' + bookid, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  getBookRatingByBookid(bookid): Observable<any> {
    return this.http
      .get(url + '/api/book/rating.php?id=' + bookid, this.options)
      .pipe(
        map((res) => {
          return res as any;
        })
      );
  }

  //////////////////// for auth guard /////////////

  // tslint:disable-next-line:typedef
  logedIn() {
    return localStorage.getItem('userData');
  }

  // tslint:disable-next-line:typedef
  notlogedin() {
    // tslint:disable-next-line:no-unused-expression
    return !localStorage.getItem('userData');
  }
}
