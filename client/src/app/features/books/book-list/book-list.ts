import { Component, inject } from '@angular/core';
import { I18nPluralPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BookEntry } from '../book-entry/book-entry';
import { Library } from '../../../library';
import { Book } from '../book';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ContentError } from '../../../shared/content-error/content-error';

type BookListState =
    { status: 'loading' }
  | { status: 'loaded'; books: Book[] }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-book-list',
  imports: [NgbAlertModule, BookEntry, ContentError, RouterLink, I18nPluralPipe, AsyncPipe],
  template: `
    @if (alertMsg.length > 0) {
      <div class="row">
        <div class="col">
          <ngb-alert
            type="warning"
            (closed)="this.alertMsg = ''"
          >
            {{ alertMsg }}
          </ngb-alert>
        </div>
      </div>
    }
    @if (bookListState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <div class="container d-flex align-items-center justify-content-center">
            <span>Loading library...</span>
          </div>
        }
        @case ('error') {
          <app-content-error [message]="state.message"></app-content-error>
        }
        @case ('loaded') {
          @if(state.books.length > 0) {
            <div class="card p-0 overflow-hidden">
              <div class="card-header p-2 ps-lg-3 pe-lg-3 d-none d-sm-flex align-items-center">
                <div class="col-6 col-sm-5 col-md-6 col-lg-7">
                  <span class="text-secondary fs-8 fw-semibold text-uppercase ls-wide">Book</span>
                </div>
                <div class="col-6 col-sm-3 col-md-2 col-lg-2 d-flex justify-content-center">
                  <span class="text-secondary fs-8 fw-semibold text-uppercase ls-wide">Status</span>
                </div>
                <div class="col-6 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center">
                  <span class="text-secondary fs-8 fw-semibold text-uppercase ls-wide">Published</span>
                </div>
                <div class="col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
                  <span class="text-secondary fs-8 fw-semibold text-uppercase ls-wide">Actions</span>
                </div>
              </div>
              <div class="card-body p-0">
                <ul class="list-group list-group-flush">
                  @for(book of state.books; track book.id) {
                    <li class="list-group-item list-group-item-action">
                      <app-book-entry [book]="book" (deleteRequested)="deleteBook($event)"></app-book-entry>
                    </li>
                  }
                </ul>
              </div>
            </div>
          } @else {
            <div class="card ps-0 pe-0 pt-5 pb-5">
              <div class="card-body d-flex flex-column align-items-center gap-3">
                <span class="fs-2"><i class="fa-solid fa-book align-middle"></i></span>
                <p class="p-0 m-0 fs-5 fw-semibold text-center">Your shelf is empty</p>
                <p class="p-0 m-0 text-secondary text-center">Add your first book to start your collection</p>
                <a class="fw-semibold fs-7" routerLink="/books/add">Add a book</a>
              </div>
            </div>
          }
          <div class="row">
            <div class="col">
              <p class="text-secondary mt-3 fs-7">{{ state.books.length | i18nPlural: bookCountMapping }} in your library</p>
            </div>
          </div>
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
