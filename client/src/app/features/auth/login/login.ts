import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthForm } from '@/features/auth/auth-form/auth-form';
import { User } from '@/core/auth/user';
import { Auth } from '@/core/auth/auth';

@Component({
  selector: 'app-login',
  imports: [AuthForm],
  template: `
    <div class="container p-0 mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col col-md-6 col-lg-4">
          <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Sign in</span>
          <h1>Log in</h1>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col col-md-6 col-lg-4">
          <div class="card">
            <app-auth-form
              submitLabel="Log in"
              [errorMessage]="errorMsg"
              alternateActionText="Don't have an account? Click here to create one!"
              alternateActionRoute="/signup"
              (submitted)="onSubmit($event)"
              (errorDismissed)="this.errorMsg = ''"
            ></app-auth-form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(Auth);
  router = inject(Router);
  errorMsg = '';

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access-token');
    if(accessToken) this.router.navigate(['/']);
  }

  onSubmit(user: User) {
    this.errorMsg = '';

    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.createSession(response);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.errorMsg = 'Failed to connect to the server. Check your connection and try again.';
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.errorMsg = serverMsg ?? 'Failed sign in. Please try again.';
      },
    });
  }
}
