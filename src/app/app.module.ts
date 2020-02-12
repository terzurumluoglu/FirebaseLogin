import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PROVIDERS, MODULES, COMPONENTS } from './app.imports';
import * as firebase from 'firebase/app';
import "firebase/auth";
import { firebaseConfig } from './helpers/firebase.config';
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
