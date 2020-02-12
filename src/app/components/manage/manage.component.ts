import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  user: User;
  constructor(
    private router : Router,
    private _auth: AuthService,
    private _error : ErrorInterceptor
  ) {
    this.getCurrentUser();
  }

  ngOnInit() {
  }

  getCurrentUser() {
    this.user = this._auth.currentUserValue;
  }

  logout(){
    this._auth.logout().then(() => {
      this.router.navigate(['/home/login']);
    }).catch(err => {
      this._error.handleError(err);
    });
  }
}