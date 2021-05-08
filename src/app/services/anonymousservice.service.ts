import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousService {
  constructor(private router: Router, private api: ApiService) {}

  // tslint:disable-next-line:typedef
  canActivate() {
    if (this.api.notlogedin()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
