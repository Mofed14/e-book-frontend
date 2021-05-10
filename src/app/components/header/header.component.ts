import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logo = '../assets/images/logo.png';

  constructor(private router: Router, private toastr: ToastrService) {}

  // toggle in the small screens
  isOpen = false;

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {}

  ////////// logout ///////////////

  // tslint:disable-next-line:typedef
  logout() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
      this.router.navigate(['/']);
      this.toastr.success('Successfully logout');
    }
  }
}
