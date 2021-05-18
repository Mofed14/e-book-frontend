import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private message: NzMessageService
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
          this.message.warning('Invalid entry data');
        } else if (res.error === 404) {
          this.message.error('The User not found');
        } else if (res.error === 401) {
          this.message.error('Incorrect password');
        } else if (res.success === true) {
          localStorage.setItem('userData', res.userdata.id);
          this.router.navigate(['/home']);
          this.message.success('Successfully login');
        } else {
          console.log(res);
        }
      });
    } else {
      this.message.error('Please enter the required data');
    }
  }
}
