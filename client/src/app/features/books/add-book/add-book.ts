import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BookForm } from '@/features/books/book-form/book-form';
import { BookApi } from '@/features/books/book-api';
import { NewBook } from '@/features/books/book';

@Component({
  selector: 'app-add-book',
  imports: [BookForm],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">New entry</span>
        <h1>Add a Book</h1>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <app-book-form
              submitLabel="Add book"
              [errorMessage]="errorMsg"
              (submitted)="onSubmit($event)"
              (errorDismissed)="this.errorMsg = ''"
            ></app-book-form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './add-book.scss',
})
export class AddBook {
  bookApi = inject(BookApi);
  router = inject(Router);
  errorMsg = '';

  onSubmit(newBook: NewBook): void {
    this.errorMsg = '';

    this.bookApi.addBook({
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
        this.errorMsg = serverMsg ?? 'Failed to add book. Please try again.';
      },
    });
  }
}
