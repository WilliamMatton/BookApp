import { Component, input, output, inject, effect } from '@angular/core';
import { FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Book, NewBook, READING_STATUSES, ReadingStatus } from '../book';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <form
      [formGroup]="bookForm"
      (ngSubmit)="submit()"
      novalidate
      class="bg-white border rounded-3 p-3"
    >
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
            formControlName="yearPublished"
            required
          />
          @if (yearPublished.touched) {
            <div class="text-danger">
              @if (yearPublished.hasError('required')) {
                <span>Please input the year of publishing.</span>
              }
              @if (yearPublished.hasError('min') || yearPublished.hasError('max')) {
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
          @if (errorMessage()) {
            <span class="text-danger text-break">{{ errorMessage() }}</span>
          }
        </div>
        <div class="col-12 col-sm-6 d-flex flex-column-reverse flex-sm-row align-items-sm-start justify-content-end gap-2 ps-3 pe-3">
          <a class="btn btn-light" routerLink="/">Cancel</a>
          <button type="submit" class="btn btn-primary">{{ submitLabel() }}</button>
        </div>
      </div>
    </form>
  `,
  styleUrl: './book-form.scss',
})
export class BookForm {
  initialValue = input<Pick<Book, 'title' | 'author' | 'yearPublished' | 'status'> | null>(null);
  submitLabel = input('Add book');
  errorMessage = input('');

  submitted = output<NewBook>();

  bookForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    yearPublished: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(2099),
      ],
    }),
    status: new FormControl<ReadingStatus>(READING_STATUSES[0], {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if(value) this.bookForm.patchValue(value);
    });
  }

  submit() {
    this.bookForm.markAllAsTouched();
    if(this.bookForm.invalid) return;

    const { title, author, yearPublished, status } = this.bookForm.getRawValue();
    if(yearPublished === null) return;

    if(this.bookForm.valid) this.submitted.emit({ title, author, yearPublished, status });
  }

  get title() {
    return this.bookForm.get('title')!;
  }

  get author() {
    return this.bookForm.get('author')!;
  }

  get yearPublished() {
    return this.bookForm.get('yearPublished')!;
  }
}
