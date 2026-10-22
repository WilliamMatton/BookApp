import { Component, inject } from '@angular/core';
import { Library } from '../../../library';
import { ActivatedRoute, Router } from '@angular/router';
import { NewQuote, Quote } from '../quote';
import { catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { QuoteForm } from '../quote-form/quote-form';
import { ContentError } from '../../../shared/content-error/content-error';

type QuoteState =
    { status: 'loading' }
  | { status: 'loaded'; quote: Quote }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-update-quote',
  imports: [AsyncPipe, QuoteForm, ContentError],
  template: `
    @if (quoteState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <div class="container d-flex align-items-center justify-content-center">
            <span>Loading quote...</span>
          </div>
        }
        @case ('loaded') {
          <div class="container p-0 mt-5">
            <div class="row">
              <span class="text-reading fw-semibold fs-8 text-uppercase ls-wider">Edit entry</span>
              <h1>Edit Quote</h1>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <app-quote-form
                    [initialValue]="state.quote"
                    submitLabel="Update quote"
                    [errorMessage]="errorMsg"
                    (submitted)="onSubmit($event)"
                    (errorDismissed)="this.errorMsg = ''"
                  ></app-quote-form>
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
  styleUrl: './update-quote.scss',
})
export class UpdateQuote {
  libraryService = inject(Library);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  quote!: Quote;
  errorMsg = '';

  quoteId = Number(this.route.snapshot.params['id']);
  
  readonly quoteState$ = this.libraryService.getQuoteById(this.quoteId).pipe(
    map((quote): QuoteState => ({ status: 'loaded', quote: quote })),
    catchError((error: HttpErrorResponse) =>
      of<QuoteState>({
        status: 'error',
        message:
          error.status === 0
          ? 'Failed to connect to the server. Check your connection and try again.'
          : 'Could not load this quote. Please try again.'
      }),
    ),
    startWith<QuoteState>({ status: 'loading' }),
  );

  onSubmit(newQuote: NewQuote): void {
    this.errorMsg = '';

    this.libraryService.updateQuote(this.quoteId, {
      quoteText: newQuote.quoteText,
      source: newQuote.source,
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
        this.errorMsg = serverMsg ?? 'Failed to update quote. Please try again.';
      },
    });
  }
}
