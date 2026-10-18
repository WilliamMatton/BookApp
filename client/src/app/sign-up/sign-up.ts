import { Component, inject } from '@angular/core';
import { AuthForm } from '../auth-form/auth-form';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  imports: [AuthForm],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Create account</span>
        <h1>Sign up</h1>
      </div>
      <div class="row">
        <div class="col">
          <app-auth-form
            submitLabel="Sign in"
            [errorMessage]="errorMsg"
            (submitted)="onSubmit($event)"
          ></app-auth-form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sign-up.scss',
})
export class SignUp {
  errorMsg = '';

  onSubmit(user: User) {
    this.errorMsg = '';

    alert(`Signed up as ${user.email}`);
  }
}
