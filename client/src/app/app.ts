import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterModule],
  template: `
    <app-header></app-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client');
}
