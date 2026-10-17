import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Library } from '../library';
import { READING_STATUSES } from '../book';

@Component({
  selector: 'app-add-book',
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">New entry</span>
        <h1>Add a Book</h1>
      </div>
      <div class="row">
        <div class="col">
          <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" novalidate class="bg-white border rounded-3 p-3">
            <div class="row mb-3">
              <div class="col">
                <label for="bookInputTitle" class="form-label fs-7">Title</label>
                <input
                  type="text"
                  class="form-control bg-light"
                  id="bookInputTitle"
                  placeholder="Book title"
                  formControlName="title"
                  required
                />
                @if (title.touched) {
                  <div class="text-danger">
                    @if (title.hasError('required')) {
                      <span>Please input the title.</span>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="bookInputAuthor" class="form-label fs-7">Author</label>
                <input
                  type="text"
                  class="form-control bg-light"
                  id="bookInputAuthor"
                  placeholder="Author name"
                  formControlName="author"
                  required
                />
                @if (author.touched) {
                  <div class="text-danger">
                    @if (author.hasError('required')) {
                      <span>Please input the author.</span>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 col-sm-6">
                <label for="bookInputYear" class="form-label fs-7">Year</label>
                <input
                  type="number"
                  class="form-control bg-light"
                  id="bookInputYear"
                  min="1"
                  max="2099"
                  placeholder="2024"
                  formControlName="year"
                  required
                />
                @if (year.touched) {
                  <div class="text-danger">
                    @if (year.hasError('required')) {
                      <span>Please input the year of publishing.</span>
                    }
                    @if (year.hasError('min') || year.hasError('max')) {
                      <span>Year must be between 1 and 2099.</span>
                    }
                  </div>
                }
              </div>
              <div class="col-12 col-sm-6">
                <label for="bookSelectStatus" class="form-label fs-7">Status</label>
                <select class="form-select bg-light" id="bookSelectStatus" formControlName="status">
                  <option value="ToRead">To read</option>
                  <option value="Reading">Reading</option>
                  <option value="Read">Read</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6">
                @if (errorMsg.length > 0) {
                  <span class="text-danger text-break">{{ errorMsg }}</span>
                }
              </div>
              <div class="col-12 col-sm-6 d-flex flex-column-reverse flex-sm-row align-items-sm-start justify-content-end gap-2 ps-3 pe-3">
                <a class="btn btn-light" routerLink="/">Cancel</a>
                <button type="submit" class="btn btn-primary">Add book</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './add-book.scss',
})
export class AddBook {
  libraryService = inject(Library);
  router = inject(Router);

  errorMsg: string = '';

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    author: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    year: new FormControl<number | null>(null , {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(2099),
      ]
    }),
    status: new FormControl(READING_STATUSES[0], {
      nonNullable: true,
      validators: Validators.required
    }),
  });

  onSubmit(): void {
    this.bookForm.markAllAsTouched();

    if(this.bookForm.invalid) return;

    const { title, author, year, status } = this.bookForm.getRawValue();
    if(year === null) return;

    this.libraryService.addBook({
      title,
      author,
      yearPublished: year,
      status,
    }).subscribe({
      next: () => {
        this.errorMsg = '';
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.errorMsg = "Failed to connect to the server. Check your connection and try again.";
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.errorMsg = serverMsg ?? 'Failed to add book. Please try again.';
      },
    });
  }

  get title() {
    return this.bookForm.get('title')!;
  }

  get author() {
    return this.bookForm.get('author')!;
  }

  get year() {
    return this.bookForm.get('year')!;
  }
}
