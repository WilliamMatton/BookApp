import { Component, input, output, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../core/auth/user';
import { RouterLink } from '@angular/router';
import { FormError } from '../form-error/form-error';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, RouterLink, FormError],
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="submit()"
      novalidate
      class="p-3"
    >
      <div class="row mb-3">
        <div class="col">
          <label for="loginInputEmail" class="form-label fs-7">Email</label>
          <input
            type="email"
            class="form-control"
            id="loginInputEmail"
            placeholder="example@email.com"
            formControlName="email"
            required
          />
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
            class="form-control"
            id="loginInputPassword"
            placeholder="Password"
            formControlName="password"
            required
          />
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
        <div class="col">
          @if (errorMessage()) {
            <app-form-error [message]="errorMessage()" (dismissed)="errorDismissed.emit()"></app-form-error>
          }
        </div>
      </div>
      <div class="row">
        <div
          class="col d-flex flex-column flex-sm-row align-items-sm-start justify-content-end gap-2 ps-3 pe-3"
        >
          <button type="submit" class="btn btn-primary">{{ submitLabel() }}</button>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col d-flex justify-content-center pt-3 pb-3">
          <a class="text-center" [routerLink]="alternateActionRoute()">
            {{ alternateActionText() }}
          </a>
        </div>
      </div>
    </form>
  `,
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  submitLabel = input('Add book');
  errorMessage = input('');
  alternateActionText = input('');
  alternateActionRoute = input('');

  submitted = output<User>();
  errorDismissed = output<void>();

  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.valid) this.submitted.emit({ email, password });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
