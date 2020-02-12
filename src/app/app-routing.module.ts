import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import { NotfoundComponent } from './components/home/notfound/notfound.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    loadChildren: () => import('./components/home/home.module')
    .then(m => m.HomeModule)
  },
  {
    path : 'manage',
    component : ManageComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '**',
    component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
