import { Component, inject } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { BookEntry } from '../book-entry/book-entry';
import { Library } from '../library';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  imports: [BookEntry, I18nPluralPipe],
  template: `
    @if (bookList.length === 0) {
      <div class="container ps-0 pe-0 pt-5 pb-5 d-flex flex-column align-items-center gap-3 bg-white rounded-4 border" style="--bs-border-style: dashed;">
        <span class="fs-2"><i class="fa-solid fa-book align-middle"></i></span>
        <p class="p-0 m-0 fs-5 fw-semibold text-center">Your shelf is empty</p>
        <p class="p-0 m-0 text-secondary text-center">Add your first book to start your collection</p>
        <button type="button" class="btn btn-link fw-semibold fs-7 text-success">Add a book</button>
      </div>
    } @else {
      <div class="container bg-white rounded-4 border">
        <div class="p-2 ps-lg-3 pe-lg-3 row bg-light rounded-top-4 border-bottom d-none d-sm-flex align-items-center">
          <div class="col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8">
            <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Book</span>
          </div>
          <div class="col-6 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center">
            <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Status</span>
          </div>
          <div class="col-6 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center">
            <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Published</span>
          </div>
          <div class="col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
            <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Actions</span>
          </div>
        </div>
        @for(book of bookList; track book.id; let last = $last) {
          <div class="row" [class.border-bottom]="!last">
            <app-book-entry [book]="book"></app-book-entry>
          </div>
        }
      </div>
    }
    <div class="row">
      <p class="text-secondary mt-3 fs-7">{{bookList.length | i18nPlural: bookCountMapping }} in your library</p>
    </div>
  `,
  styleUrl: './book-list.scss',
})
export class BookList {
  readonly bookCountMapping = {
    '=1': '# book',
    other: '# books',
  };

  bookList: Book[] = [];
  libraryService = inject(Library);

  constructor() {
    this.libraryService.getAllBooks().then((bookList: Book[]) => {
      this.bookList = bookList;
    });
  }
}
