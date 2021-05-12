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
  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getuserbooks();
  }

  // tslint:disable-next-line:typedef
  getuserbooks() {
    this.api.getUserBooksByUserId(this.userid).subscribe((res) => {
      console.log(res);
    });
  }
}
