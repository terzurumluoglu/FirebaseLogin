import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private _firebase: FirebaseService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  forgotPassword(email: string) {
    return this._firebase.forgotPassword(email);
  }

  login(email, password): Promise<any> {
    return new Promise((res, rej) => {
      this._firebase.signInWithEmailAndPassword(email, password).then(p => {
        if (p) {
          let user: User = new User(p.user.uid, p.user.email, p.user.phoneNumber);
          this.saveUser(user);
          res(user);
        } else {
          rej({});
        }
      }).catch(err => {
        rej(err);
      })
    });
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((res, rej) => {
      this._firebase.createUserWithEmailAndPassword(email, password).then(p => {
        if (p) {
          let user: User = new User(p.user.uid, p.user.email, p.user.phoneNumber);
          this.saveUser(user);
          res(user);
        } else {
          rej({});
        }
      }).catch(err => {
        rej(err);
      })
    })
  }

  facebook() {
    return this._firebase.signInWithFacebook();
  }

  google() {
    return this._firebase.signInWithGoogle();
  }

  github() {
    return this._firebase.signInWithGitHub();
  }

  saveUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    return new Promise((res, rej) => {
      this._firebase.signOut().then(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        res(true);
      }).catch(err => {
        rej(err);
      });
    });
  }
}
