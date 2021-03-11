import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLoginComponent } from './components/register-login/register-login.component';



@NgModule({
  declarations: [RegisterLoginComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
