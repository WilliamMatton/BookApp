import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container pt-2 pb-2">
          <a class="navbar-brand fw-semibold" routerLink="/">Leafmark</a>
          <ul class="navbar-nav mb-2 mb-lg-0 nav-pills global-app-nav">
            <li class="nav-item ms-1 me-1">
              <a
                class="nav-link ps-3 pe-3 fs-7"
                aria-current="page"
                [routerLinkActiveOptions]="{exact: true}"
                routerLinkActive="bg-secondary bg-opacity-25 active"
                routerLink="/"
              >Books</a>
            </li>
            <li class="nav-item ms-1 me-1">
              <a
                class="nav-link ps-3 pe-3 fs-7"
                routerLinkActive="bg-secondary bg-opacity-25 active"
                routerLink="quotes"
              >Quotes</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styleUrl: './header.scss',
})
export class Header {

}
