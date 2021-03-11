import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import {
  AuthApiService,
  Role,
  UserAuthDto,
  UserRegisterDto,
} from 'src/api/rest/api';
import { SMErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sm-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
})
export class RegisterLoginComponent implements OnInit {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  @ViewChild('tabs') tabGroup: MatTabGroup;

  @ViewChild('loginForm') loginForm: NgForm;
  @ViewChild('registerForm') registerForm: NgForm;

  errorStateMatcher = new SMErrorStateMatcher();

  loginModel: UserAuthDto = {
    email: '',
    password: '',
  };

  registerModel: UserRegisterDto = {
    email: '',
    name: '',
    password: '',
  };
  passwordConfirm: string;

  roles = Role;

  ngOnInit(): void {}

  selectedTabChange() {}

  loginClick(): void {
    if (!this.loginForm.valid) return;
    this.authApiService.apiAuthLoginPost(this.loginModel).subscribe(
      (response) => {
        console.log(response);
        this.authService.setUserData(response);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  goToRegisterClick(): void {
    this.tabGroup.selectedIndex = 1;
  }

  registerClick(): void {
    if (!this.registerForm.valid) return;
    this.authApiService.apiAuthRegisterPost(this.registerModel).subscribe(
      (response) => {
        console.log(response);
        this.authService.setUserData(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
