import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BookApi } from '../book-api';
import { BookForm } from '../book-form/book-form';
import { Book, NewBook } from '../book';
import { ContentError } from '../../../shared/content-error/content-error';

type BookState =
    { status: 'loading' }
  | { status: 'loaded'; book: Book }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-update-book',
  imports: [BookForm, AsyncPipe, ContentError],
  template: `
    @if (bookState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <div class="container d-flex align-items-center justify-content-center">
            <span>Loading book...</span>
          </div>
        }
        @case ('loaded') {
          <div class="container p-0 mt-5">
            <div class="row">
              <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Edit entry</span>
              <h1 class="text-truncate">Edit "{{ state.book.title }}"</h1>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <app-book-form
                    [initialValue]="state.book"
                    submitLabel="Update book"
                    [errorMessage]="errorMsg"
                    (submitted)="onSubmit($event)"
                    (errorDismissed)="this.errorMsg = ''"
                  ></app-book-form>
                </div>
              </div>
            </div>
          </div>
        }
        @case ('error') {
          <app-content-error [message]="state.message"></app-content-error>
        }
      }
    }
  `,
  styleUrl: './update-book.scss',
})
export class UpdateBook {
  bookApi = inject(BookApi);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  book!: Book;
  errorMsg = '';

  bookId = Number(this.route.snapshot.params['id']);
  
  readonly bookState$ = this.bookApi.getBookById(this.bookId).pipe(
    map((book): BookState => ({ status: 'loaded', book })),
    catchError((error: HttpErrorResponse) =>
      of<BookState>({
        status: 'error',
        message:
          error.status === 0
          ? 'Failed to connect to the server. Check your connection and try again.'
          : 'Could not load this book. Please try again.'
      }),
    ),
    startWith<BookState>({ status: 'loading' }),
  );

  onSubmit(newBook: NewBook): void {
    this.errorMsg = '';

    this.bookApi.updateBook(this.bookId, {
      title: newBook.title,
      author: newBook.author,
      yearPublished: newBook.yearPublished,
      status: newBook.status,
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.errorMsg = 'Failed to connect to the server. Check your connection and try again.';
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.errorMsg = serverMsg ?? 'Failed to update book. Please try again.';
      },
    });
  }
}
