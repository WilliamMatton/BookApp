import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote-entry',
  imports: [RouterLink],
  template: `
    <div class="container p-0">
      <div class="row row-gap-3 pt-3 pb-3 p-lg-3">
        <div class="col-12 col-sm-6 col-md-8 d-flex align-items-center column-gap-2 column-gap-lg-3">
          <span class="fs-5 bg-success bg-gradient text-light pt-2 pb-2 ps-1 pe-1 rounded-3 shadow">
            <i class="fa-solid fa-quote-left align-middle"></i>
            <i class="fa-solid fa-quote-right align-middle"></i>
          </span>
          <div class="d-flex flex-column">
            <p class="text-secondary fs-7 p-0 m-0">{{quote.quoteText}}</p>
          </div>
        </div>
        <div class="col-12 col-sm-3 col-md-2 d-flex align-items-center justify-content-sm-center">
          <span class="fs-7 text-secondary">{{quote.source}}</span>
        </div>
        <div class="col-12 col-sm-3 col-md-2 col-lg-2 d-flex align-items-center justify-content-sm-center gap-2">
          <a
            class="btn border rounded-3 fs-7 opacity-75 update-quote-button"
            [routerLink]="['/quotes/update', quote.id]"
            aria-label="Edit quote"
          >
            <i class="fa-solid fa-pencil align-middle"></i>
          </a>
          <button
            type="button"
            class="btn border rounded-3 fs-7 opacity-75 delete-quote-button"
            aria-label="Delete quote"
            (click)="openModal()"
          >
            <i class="fa-solid fa-trash align-middle"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './quote-entry.scss',
})
export class QuoteEntry {
  @Input() quote!: Quote;
  @Output() deleteRequested = new EventEmitter<number>();

  openModal(): void {
    
  }
}
