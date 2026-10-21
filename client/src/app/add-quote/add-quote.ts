import { Component, inject } from '@angular/core';
import { Library } from '../library';
import { Router } from '@angular/router';
import { NewQuote } from '../quote';
import { HttpErrorResponse } from '@angular/common/http';
import { QuoteForm } from '../quote-form/quote-form';

@Component({
  selector: 'app-add-quote',
  imports: [QuoteForm],
  template: `
    <div class="container p-0 mt-5">
      <div class="row">
        <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">New entry</span>
        <h1>Add a Quote</h1>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <app-quote-form
              submitLabel="Add quote"
              [errorMessage]="errorMsg"
              (submitted)="onSubmit($event)"
              (errorDismissed)="this.errorMsg = ''"
            ></app-quote-form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './add-quote.scss',
})
export class AddQuote {
  libraryService = inject(Library);
  router = inject(Router);
  errorMsg = '';

  onSubmit(newQuote: NewQuote): void {
    this.errorMsg = '';

    this.libraryService.addQuote({
      quoteText: newQuote.quoteText,
      source: newQuote.source
    }).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.errorMsg = 'Failed to connect to the server. Check your connection and try again.';
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.errorMsg = serverMsg ?? 'Failed to add quote. Please try again.';
      },
    });
  }
}
