import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <h1>Hello World</h1>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}
