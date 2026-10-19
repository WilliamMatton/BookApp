import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthForm } from '../auth-form/auth-form';
import { User } from '../user';
import { Auth } from '../auth';

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
  authService = inject(Auth);
  router = inject(Router);
  errorMsg = '';

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access-token');
    if(accessToken) this.router.navigate(['/']);
  }

  onSubmit(user: User) {
    this.errorMsg = '';

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.errorMsg = 'Failed to connect to the server. Check your connection and try again.';
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.errorMsg = serverMsg ?? 'Failed create account. Please try again.';
      },
    });
  }
}
