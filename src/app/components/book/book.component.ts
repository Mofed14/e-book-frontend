import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  userid = localStorage.getItem('userData');
  books: any;
  error: any;
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getuserbooks();
    this.notifications();
  }

  // tslint:disable-next-line:typedef
  getuserbooks() {
    this.api.getUserBooksByUserId(this.userid).subscribe((res) => {
      if (res.error === 404) {
        this.error = res.error;
        this.message.info('You don`t have any books ');
      } else if (res.success === true) {
        this.books = res.books;
      } else {
        console.log(res);
      }
    });
  }

  notifications() {
    this.notification.blank(
      'Rate Now',
      'Please give your review about these books'
    );
  }
}
