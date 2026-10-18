import { Component, inject } from '@angular/core';
import { AuthForm } from '../auth-form/auth-form';
import { User } from '../user';

@Component({
  selector: 'app-login',
  imports: [AuthForm],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Sign in</span>
        <h1>Login</h1>
      </div>
      <div class="row">
        <div class="col">
          <app-auth-form
            submitLabel="Log in"
            [errorMessage]="errorMsg"
            (submitted)="onSubmit($event)"
          ></app-auth-form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.scss',
})
export class Login {
  errorMsg = '';

  onSubmit(user: User) {
    this.errorMsg = '';

    alert(`Welcome ${user.email}`);
  }
}
