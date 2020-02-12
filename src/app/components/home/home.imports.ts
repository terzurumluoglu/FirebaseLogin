// COMPONENTS
import { PhoneComponent } from './phone/phone.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';

// MODULES
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PhoneComponent
];

export const MODULES = [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
];