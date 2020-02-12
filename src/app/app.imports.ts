// COMPONENTS
import { ManageComponent } from './components/manage/manage.component';
import { NotfoundComponent } from './components/home/notfound/notfound.component';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// PROVIDERS
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthService } from './services/auth/auth.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './components/home/home.module';

export const COMPONENTS = [
    ManageComponent,
    NotfoundComponent
];

export const MODULES = [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
];

export const PROVIDERS = [
    AuthService,
    FirebaseService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor, multi: true
    }
];