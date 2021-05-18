import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private message: NzMessageService
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
          this.message.warning('Invalid entry data or The User already exists');
        } else if (res.success === true) {
          this.router.navigate(['/login']);
          this.message.success('Successfully sing up');
        } else {
          console.log(res);
        }
      });
    } else {
      this.message.error('Please enter the required data');
    }
  }
}
