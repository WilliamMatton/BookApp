import { Component, inject } from '@angular/core';
import { I18nPluralPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BookEntry } from '../book-entry/book-entry';
import { Library } from '../library';
import { Book } from '../book';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type BookListState =
    { status: 'loading' }
  | { status: 'loaded'; books: Book[] }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-book-list',
  imports: [NgbAlertModule, BookEntry, RouterLink, I18nPluralPipe, AsyncPipe],
  template: `
    @if (bookListState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <div class="container d-flex align-items-center justify-content-center">
            <span>Loading content...</span>
          </div>
        }
        @case ('error') {
          <div class="container d-flex align-items-center justify-content-center">
            <span class="text-danger">{{ state.message }}</span>
          </div>
        }
        @case ('loaded') {
          @if(state.books.length > 0) {
            <div class="container bg-white rounded-4 border">
              <div class="row p-2 ps-lg-3 pe-lg-3 bg-light rounded-top-4 border-bottom d-none d-sm-flex align-items-center">
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
              @for(book of state.books; track book.id; let last = $last) {
                <div class="row" [class.border-bottom]="!last">
                  <app-book-entry [book]="book" (deleteRequested)="deleteBook($event)"></app-book-entry>
                </div>
              }
            </div>
          } @else {
            <div class="container ps-0 pe-0 pt-5 pb-5 d-flex flex-column align-items-center gap-3 bg-white rounded-4 border" style="--bs-border-style: dashed;">
              <span class="fs-2"><i class="fa-solid fa-book align-middle"></i></span>
              <p class="p-0 m-0 fs-5 fw-semibold text-center">Your shelf is empty</p>
              <p class="p-0 m-0 text-secondary text-center">Add your first book to start your collection</p>
              <a class="btn btn-link fw-semibold fs-7 text-success" routerLink="add">Add a book</a>
            </div>
          }
          <div class="row">
            <p class="text-secondary mt-3 fs-7">{{state.books.length | i18nPlural: bookCountMapping }} in your library</p>
          </div>
          @if (alertMsg.length > 0) {
            <div class="row">
              <ngb-alert type="warning">{{ alertMsg }}</ngb-alert>
            </div>
          }
        }
      }
    }
  `,
  styleUrl: './book-list.scss',
})
export class BookList {
  libraryService = inject(Library);
  alertMsg: string = '';

  private readonly refreshBooks$ = new Subject<void>();

  readonly bookListState$ = this.refreshBooks$.pipe(
    startWith(void 0),
    switchMap(() => 
      this.libraryService.getAllBooks().pipe(
        map((books): BookListState => ({ status: 'loaded', books })),
        catchError((error: HttpErrorResponse) =>
          of<BookListState>({
            status: 'error',
            message:
              error.status === 0
              ? 'Failed to connect to the server. Check your connection and try again.'
              : 'Failed to load books. Please try again.'
          }),
        ),
        startWith<BookListState>({ status: 'loading' }),
      ),
    ),
  );

  readonly bookCountMapping = {
    '=1': '# book',
    other: '# books',
  };

  constructor() { }

  deleteBook(id: number): void {
    this.alertMsg = '';

    this.libraryService.deleteBook(id).subscribe({
      next: () => this.refreshBooks$.next(),
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.alertMsg = "Failed to connect to the server. Check your connection and try again.";
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.alertMsg = serverMsg ?? 'Failed to delete book. Please try again.';
      },
    });
  }
}
