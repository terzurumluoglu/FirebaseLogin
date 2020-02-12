import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { PhoneComponent } from './phone/phone.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'phone',
        component : PhoneComponent
      },
      {
        path : 'register',
        component : RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
