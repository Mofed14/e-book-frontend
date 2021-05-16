import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './search.css'],
})
export class HomepageComponent implements OnInit {
  book: any;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public dataservice: DataService
  ) {}
  buyform: any;
  rates: any;
  array = [];
  bookid: any;
  forms: any;
  books: any;
  searchText;
  limit = 8;
  items: any;
  value = 5;
  closeResult: string;
  keybookdata = localStorage.getItem('userData');
  // هخلي اليوزر المتخذن هو المفتاح بتاع الكتب اللي هتتخزن
  data;
  private subject = new Subject<any>();

  ngOnInit(): void {
    this.listAllBooks(this.limit);
    // this.form();
    // console.log(this.bookid);
  }

  // tslint:disable-next-line:typedef
  listAllBooks(limit) {
    this.api.getAllBooks(limit).subscribe((res) => {
      if (res.books.length) {
        this.books = res.books;
        this.array = res.books.map((result) => {
          this.bookid = result.id;
        });
        console.log(this.books);
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

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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

  getdata(event) {
    ////////// هتجيب الداتا القديمه وتضيف ليها الجديده عشان اي كتاب اضغط عليه اضيفه في الوكل استورج
    const oldobject = JSON.parse(localStorage.getItem(this.keybookdata)) || [];
    if (oldobject.length >= 5) {
      this.toastr.warning('The cart is full');
    } else {
      oldobject.push(event);
      localStorage.setItem(this.keybookdata, JSON.stringify(oldobject));
      this.dataservice.addbookstocart();
    }
  }
}
