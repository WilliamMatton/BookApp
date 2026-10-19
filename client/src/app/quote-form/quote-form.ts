import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewQuote, Quote } from '../quote';

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <form
      [formGroup]="quoteForm"
      (ngSubmit)="submit()"
      novalidate
      class="bg-white border rounded-3 p-3"
    >
      <div class="row mb-3">
        <div class="col">
          <label for="quoteInputText" class="form-label fs-7">Quote</label>
          <input
            type="text"
            class="form-control bg-light"
            id="quoteInputText"
            placeholder="Type a quote"
            formControlName="quoteText"
            required
          />
          @if (quoteText.touched) {
            <div class="text-danger">
              @if (quoteText.hasError('required')) {
                <span>Please input the quote.</span>
              }
            </div>
          }
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="quoteInputSource" class="form-label fs-7">Source</label>
          <input
            type="text"
            class="form-control bg-light"
            id="quoteInputSource"
            placeholder="John Doe - 2000"
            formControlName="source"
            required
          />
          @if (source.touched) {
            <div class="text-danger">
              @if (source.hasError('required')) {
                <span>Please input the quote source.</span>
              }
            </div>
          }
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-6">
          @if (errorMessage()) {
            <span class="text-danger text-break">{{ errorMessage() }}</span>
          }
        </div>
        <div class="col-12 col-sm-6 d-flex flex-column-reverse flex-sm-row align-items-sm-start justify-content-end gap-2 ps-3 pe-3">
          <a class="btn btn-light" routerLink="/quotes">Cancel</a>
          <button type="submit" class="btn btn-primary">{{ submitLabel() }}</button>
        </div>
      </div>
    </form>
  `,
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  initialValue = input<Pick<Quote, 'quoteText' | 'source'> | null>(null);
  submitLabel = input('Add quote');
  errorMessage = input('');

  submitted = output<NewQuote>();

  quoteForm = inject(FormBuilder).nonNullable.group({
    quoteText: ['', Validators.required],
    source: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if(value) this.quoteForm.patchValue(value);
    });
  }

  submit() {
    this.quoteForm.markAllAsTouched();
    if(this.quoteForm.invalid) return;

    const { quoteText, source } = this.quoteForm.getRawValue();
    
    if(this.quoteForm.valid) this.submitted.emit({ quoteText, source });
  }

  get quoteText() {
    return this.quoteForm.get('quoteText')!;
  }

  get source() {
    return this.quoteForm.get('source')!;
  }
}
