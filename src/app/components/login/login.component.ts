import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
          console.log('شكل الايميل غير صحيح');
        } else if (res.error === 404) {
          console.log('المستخدم غير موجود ');
        } else if (res.error === 401) {
          console.log('الباسورد غير صحيح');
        } else if (res.success === true) {
          localStorage.setItem('userData', JSON.stringify(res.userdata));
          this.router.navigate(['/home']);
        } else {
          console.log(res);
        }
      });
    } else {
      console.log('ادخل البيانات المطلوبه ');
    }
  }
}
