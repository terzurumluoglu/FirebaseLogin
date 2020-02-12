import { NgModule } from '@angular/core';
import { MODULES, COMPONENTS } from './home.imports';


@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    MODULES
  ]
})
export class HomeModule { }