import { Component, signal } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgbCollapse],
  template: `
    <header>
      <nav class="navbar navbar-expand-md border-bottom">
        <div class="container pt-2 pb-2">
          <a class="navbar-brand fw-semibold d-flex align-items-center gap-2" routerLink="/">
            <div class="text-light bg-primary fs-6 rounded-3 logo-icon">
              <i class="fa-solid fa-book align-middle"></i>
            </div>
            Leafmark
          </a>
          <button type="button" class="navbar-toggler" (click)="isMenuCollapsed.set(!isMenuCollapsed())">
            <span class="navbar-toggler-icon fs-7"></span>
          </button>
          <div [ngbCollapse]="isMenuCollapsed()" class="collapse navbar-collapse p-2 p-md-0 rounded-3 rounded-md-0 global-app-nav">
            <ul class="navbar-nav ms-md-auto mb-2 mb-lg-0 nav-pills">
              <li class="nav-item ms-md-1 me-md-1">
                <a
                  class="nav-link ps-3 pe-3 fs-7"
                  aria-current="page"
                  [routerLinkActiveOptions]="{exact: true}"
                  routerLinkActive="bg-secondary bg-opacity-25 active"
                  routerLink="/"
                  (click)="isMenuCollapsed.set(true)"
                >Books</a>
              </li>
              <li class="nav-item ms-md-1 me-md-1">
                <a
                  class="nav-link ps-3 pe-3 fs-7"
                  routerLinkActive="bg-secondary bg-opacity-25 active"
                  routerLink="quotes"
                  (click)="isMenuCollapsed.set(true)"
                >Quotes</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrl: './header.scss',
})
export class Header {
  readonly isMenuCollapsed = signal(true);
}
