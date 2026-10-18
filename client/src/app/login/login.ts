import { Component, input, inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Sign in</span>
        <h1>Login</h1>
      </div>
      <div class="row">
        <div class="col">
          <form
            [formGroup]="loginForm"
            (ngSubmit)="login()"
            novalidate
            class="bg-white border rounded-3 p-3"
          >
            <div class="row mb-3">
              <div class="col">
                <label for="loginInputEmail" class="form-label fs-7">Email</label>
                <input
                  type="email"
                  class="form-control bg-light"
                  id="loginInputEmail"
                  placeholder="example@email.com"
                  formControlName="email"
                  required
                >
                @if (email.touched) {
                  <div class="text-danger">
                    @if (email.hasError('required')) {
                      <span>Please input an email.</span>
                    }
                    @if (email.hasError('email')) {
                      <span>Please input a valid email.</span>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="loginInputPassword" class="form-label fs-7">Password</label>
                <input
                  type="password"
                  class="form-control bg-light"
                  id="loginInputPassword"
                  placeholder="Password"
                  formControlName="password"
                  required
                >
                @if (password.touched) {
                  <div class="text-danger">
                    @if (password.hasError('required')) {
                      <span>Please input a password.</span>
                    }
                    @if (password.hasError('minlength')) {
                      <span>Password must be at least 10 characters long.</span>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6">
                @if (errorMessage.length > 0) {
                  <span class="text-danger text-break">{{ errorMessage }}</span>
                }
              </div>
              <div class="col-12 col-sm-6 d-flex flex-column flex-sm-row align-items-sm-start justify-content-end gap-2 ps-3 pe-3">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = '';

  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(10),
    ]],
  });

  login(): void {
    this.errorMessage = '';
    this.loginForm.markAllAsTouched();

    if(this.loginForm.invalid) return;

    alert('Logged in');
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
