import { Component } from '@angular/core';
import { BookList } from '../book-list/book-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [BookList, RouterLink],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Personal library</span>
          <h1>Your Books</h1>
          <span class="text-secondary fs-6">Keep track of your personal collection of books</span>
        </div>
        <div class="col-12 col-sm-4 col-md-3 col-xl-2 d-flex align-items-end justify-content-end">
          <a class="btn btn-primary fw-medium fs-7 pt-2 ps-3 mt-2 pe-3 rounded-3 w-100" routerLink="/books/add">
            <span class="fs-8"><i class="fa-solid fa-plus"></i></span>
            Add new book
          </a>
        </div>
      </div>
      <div class="row ps-0 pe-0 pt-4">
        <app-book-list></app-book-list>
      </div>
    </div>
  `,
  styleUrl: './home.scss',
})
export class Home {

}
