import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loader: boolean = false;
  user: User;
  socialArr: any[] = [
    { title: 'Facebook', cssClass: 'circle pointer facebook', icon: 'fab fa-facebook-f' },
    { title: 'Google', cssClass: 'circle pointer google', icon: 'fab fa-google' },
    { title: 'GitHub', cssClass: 'circle pointer github', icon: 'fab fa-github' },
    { title: 'Phone', cssClass: 'circle pointer phone', icon: 'fas fa-phone' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _error: ErrorInterceptor
  ) {
    this.getCurrentUser();
    this.user ? router.navigate(['manage']) : this.createLoginForm();
  }

  ngOnInit() {
  }

  go() {
    this.router.navigate(['/home/phone']);
  }

  getCurrentUser() {
    this.user = this._auth.currentUserValue;
  }

  loginWithSocial(title: string) {
    this.loader = true;
    switch (title) {
      case 'Facebook': this.loginWithFacebook();
        this.loader = false;
        break;
      case 'Google': this.loginWithGoogle();
        this.loader = false;
        break;
      case 'GitHub': this.loginWithGithub();
        this.loader = false;
        break;
      case 'Phone': this.router.navigate(['home/phone']);
        break;
    }
  }

  loginWithFacebook() {
    this._auth.facebook().then((p: any) => {
      this._auth.saveUser({ id: p.uid, email: p.email, phoneNumber: p.phoneNumber });
      this.router.navigate(['/manage']);
    }).catch(err => {
      this._error.handleError(err);
    })
  }

  loginWithGoogle() {
    this._auth.google().then((p: any) => {
      this._auth.saveUser({ id: p.uid, email: p.email, phoneNumber: p.phoneNumber });
      this.router.navigate(['/manage']);
    }).catch(err => {
      this._error.handleError(err);
    })
  }

  loginWithGithub() {
    this._auth.github().then((p: any) => {
      this._auth.saveUser({ id: p.uid, email: p.email, phoneNumber: p.phoneNumber });
      this.router.navigate(['/manage']);
    }).catch(err => {
      this._error.handleError(err);
    })
  }

  login(form: FormGroup) {
    this.loader = true;
    this._auth.login(form.value.email, form.value.password).then(u => {
      this.loader = false;
      this.router.navigate(['/manage']);
    }).catch(e => {
      this.loader = false;
      this._error.handleError(e);
    });
  }

  forgotPassword(email: string) {
    this.loader = true;
    this._auth.forgotPassword(email).then(p => {
      this.loader = false;
    }).catch(err => {
      this.loader = false;
      this._error.handleError(err);
    })
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    });
  }
}
