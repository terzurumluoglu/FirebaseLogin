import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { PasswordMatch } from 'src/app/helpers/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _error: ErrorInterceptor
  ) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  register(form: FormGroup) {
    this.loader = true;
    if(form.valid == true){
      if (form.value.password == form.value.passwordConfirm) {
        this._auth.createUserWithEmailAndPassword(form.value.email,form.value.password).then(p => {
          this.loader = false;
          this.router.navigate(['/manage']);
        }).catch(err => {
          this._error.handleError(err);
          this.loader = false;
        });
      } else {
        this.loader = false;
        // PASSWORD NOT MATCH
      }
    }
    else{
      this.loader = false;
      // INVALID
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    },
      {
        validator: PasswordMatch('password', 'passwordConfirm') // your validation method
      })
  }

  get f() { return this.registerForm.controls; }

}
