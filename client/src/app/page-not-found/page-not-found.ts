import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <span class="fs-1">
            <i class="fa-regular fa-face-frown"></i>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex flex-column justify-content-center align-items-center text-center">
          <h1>Sorry,</h1>
          <p class="fw-semibold">
            The page you were looking for could not be found.
          </p>
          <a routerLink="/">Return to homepage</a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {

}
