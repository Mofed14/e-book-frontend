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

<<<<<<< HEAD
  constructor(private router: Router, private toastr: ToastrService) {}
=======
logo = '../assets/images/logo.png';
 
// toggle in the small screens
  isOpen :boolean=false;

  toggleNavbar(){
    this.isOpen = !this.isOpen
  }
>>>>>>> bbc08ed77b094e11e8812aaaaa6c9e92e239e421

  ngOnInit(): void {}

  // //////////logout///////////////

  //   // tslint:disable-next-line:typedef
  //   logout() {
  //     if (localStorage.getItem('userData')) {
  //       localStorage.removeItem('userData');
  //       this.router.navigate(['/']);
  //       this.toastr.success('Successfully logout');
  //     }
  //   }
}
