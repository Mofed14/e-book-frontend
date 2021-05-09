import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formBuilder();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  formBuilder() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  signup() {
    const body = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    if (body.firstname && body.lastname && body.email && body.password) {
      this.api.register(body).subscribe((res) => {
        if (res.error === 400) {
          this.toastr.warning(
            ' تاكد من صحة البيانات المدخلة او ان المستخدم غير موجود '
          );
        } else if (res.success === true) {
          this.router.navigate(['/login']);
          this.toastr.success('تم انشاء حساب بنجاح', 'مبروك');
        } else {
          console.log(res);
        }
      });
    } else {
      this.toastr.error('ادخل البيانات المطلوبه ');
    }
  }
}
