import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { I18nPluralPipe } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Library } from '../library';
import { Quote } from '../quote';
import { RouterLink } from '@angular/router';
import { QuoteEntry } from '../quote-entry/quote-entry';
import { ContentError } from '../content-error/content-error';

type QuoteListState =
    { status: 'loading' }
  | { status: 'loaded'; quotes: Quote[] }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-quote-list',
  imports: [AsyncPipe, I18nPluralPipe, NgbAlertModule, RouterLink, QuoteEntry, ContentError],
  template: `
    @if (alertMsg.length > 0) {
      <div class="row">
        <div class="col">
          <ngb-alert
            type="warning"
            (closed)="this.alertMsg=''"
          >
              {{ alertMsg }}
          </ngb-alert>
        </div>
      </div>
    }
    @if (quoteListState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <div class="container d-flex align-items-center justify-content-center">
            <span>Loading quotes...</span>
          </div>
        }
        @case ('error') {
          <app-content-error [message]="state.message"></app-content-error>
        }
        @case ('loaded') {
          @if(state.quotes.length > 0) {
            <div class="card p-0 overflow-hidden">
              <div class="card-header p-2 ps-lg-3 pe-lg-3 d-none d-sm-flex align-items-center">
                <div class="col-6 col-sm-6 col-md-8">
                  <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Quote</span>
                </div>
                <div class="col-6 col-sm-3 col-md-2 d-flex justify-content-center">
                  <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Source</span>
                </div>
                <div class="col-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
                  <span class="text-secondary fs-8 fw-medium text-uppercase ls-wide">Actions</span>
                </div>
              </div>
              <div class="card-body p-0">
                <ul class="list-group list-group-flush">
                  @for(quote of state.quotes; track quote.id) {
                    <li class="list-group-item list-group-item-action">
                      <app-quote-entry [quote]="quote" (deleteRequested)="deleteQuote($event)"></app-quote-entry>
                    </li>
                  }
                </ul>
              </div>
            </div>
          } @else {
            <div class="card ps-0 pe-0 pt-5 pb-5">
              <div class="card-body d-flex flex-column align-items-center gap-3">
                <span class="fs-2"><i class="fa-solid fa-book align-middle"></i></span>
                <p class="p-0 m-0 fs-5 fw-semibold text-center">No saved quotes</p>
                <p class="p-0 m-0 text-secondary text-center">Add your first quote to the list</p>
                <a class="fw-semibold fs-7" routerLink="/quotes/add">Add a quote</a>
              </div>
            </div>
          }
          <div class="row">
            <div class="col">
              <p class="text-secondary mt-3 fs-7">{{ state.quotes.length | i18nPlural: quoteCountMapping }} in your library</p>
            </div>
          </div>
        }
      }
    }
  `,
  styleUrl: './quote-list.scss',
})
export class QuoteList {
  libraryService = inject(Library);
  alertMsg: string = '';

  private readonly refreshQuotes$ = new Subject<void>();

  readonly quoteListState$ = this.refreshQuotes$.pipe(
    startWith(void 0),
    switchMap(() => 
      this.libraryService.getAllQuotes().pipe(
        map((quotes): QuoteListState => ({ status: 'loaded', quotes })),
        catchError((error: HttpErrorResponse) =>
          of<QuoteListState>({
            status: 'error',
            message:
              error.status === 0
              ? 'Failed to connect to the server. Check your connection and try again.'
              : 'Failed to load quotes. Please try again.'
          }),
        ),
        startWith<QuoteListState>({ status: 'loading' }),
      ),
    ),
  );

  readonly quoteCountMapping = {
    '=1': '# quote',
    other: '# quotes',
  };

  constructor() { }

  deleteQuote(id: number): void {
    this.alertMsg = '';

    this.libraryService.deleteQuote(id).subscribe({
      next: () => this.refreshQuotes$.next(),
      error: (error: HttpErrorResponse) => {
        if(error.status === 0) {
          this.alertMsg = "Failed to connect to the server. Check your connection and try again.";
          return;
        }

        const serverMsg = typeof error.error === 'string' ? error.error : error.error?.title;
        this.alertMsg = serverMsg ?? 'Failed to delete quote. Please try again.';
      },
    });
  }
}
