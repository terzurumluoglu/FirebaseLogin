import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireAuth = firebase.auth();
  googleProvider = new firebase.auth.GoogleAuthProvider();
  facebookProvider = new firebase.auth.FacebookAuthProvider();
  gitHubProvider = new firebase.auth.GithubAuthProvider();

  constructor(private _error: ErrorInterceptor) { }

  getCurrentUser(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        res(user);
      });
    })
  }

  forgotPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithPhoneNumber(phone: string, appVerifier: any) {
    return this.fireAuth.signInWithPhoneNumber(phone, appVerifier);
  }

  signInWithGoogle() {
    this.googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().useDeviceLanguage();

    return new Promise((res, rej) => {
      firebase.auth().signInWithPopup(this.googleProvider).then(function (result) {
        // res({token : result.credential.accessToken, user : result.user});
        res(result.user);
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        // // ...
      }).catch(function (error) {
        rej(error);
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
      });
    });
  }

  signInWithFacebook() {
    this.facebookProvider.addScope('email');
    firebase.auth().useDeviceLanguage();
    return new Promise((res, rej) => {
      firebase.auth().signInWithPopup(this.facebookProvider).then(function (result) {
        res(result.user);
      }).catch(function (error) {
        rej(error);
      });
    });
  }

  signInWithGitHub() {
    this.gitHubProvider.addScope('user');
    firebase.auth().useDeviceLanguage();
    return new Promise((res, rej) => {
      firebase.auth().signInWithPopup(this.gitHubProvider).then(function (result) {
        res(result.user);
      }).catch(function (error) {
        rej(error);
      });
    });
  }

  signOut() {
    return this.fireAuth.signOut();
  }
}
