import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  form() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (body.email && body.password) {
      this.api.login(body).subscribe((res) => {
        if (res.error === 400) {
          this.toastr.warning('Invalid entry data');
        } else if (res.error === 404) {
          this.toastr.error('The User not found');
        } else if (res.error === 401) {
          this.toastr.error('Incorrect password');
        } else if (res.success === true) {
          localStorage.setItem('userData', JSON.stringify(res.userdata.id));
          this.router.navigate(['/home']);
          this.toastr.success('Successfully login');
        } else {
          console.log(res);
        }
      });
    } else {
      this.toastr.error('Please enter the required data');
    }
  }
}
