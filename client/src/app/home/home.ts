import { Component } from '@angular/core';
import { BookList } from '../book-list/book-list';

@Component({
  selector: 'app-home',
  imports: [BookList],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <div class="col">
          <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Personal library</span>
          <h1>Your Books</h1>
          <span class="text-secondary fs-6">Keep track of the stories and ideas you want to return to</span>
        </div>
        <div class="col d-flex align-items-end justify-content-end">
          <button type="button" class="btn btn-primary fw-medium fs-7 pt-2 ps-3 pe-3 rounded-3">
            <span class="fs-8"><i class="fa-solid fa-plus"></i></span>
            Add new book
          </button>
        </div>
      </div>
      <div class="row ps-0 pe-0 pt-4">
        <app-book-list></app-book-list>
      </div>
      <div class="row">
        <p class="text-secondary mt-3 fs-7">0 books in your library</p>
      </div>
    </div>
  `,
  styleUrl: './home.scss',
})
export class Home {

}
