import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '../quote';
import { DeleteEntryModal } from '../shared/delete-entry-modal/delete-entry-modal';

@Component({
  selector: 'app-quote-entry',
  imports: [RouterLink],
  template: `
    <div class="row row-gap-3 pt-3 pb-3 p-lg-3">
      <div class="col-12 col-sm-6 col-md-8 d-flex align-items-center column-gap-2 column-gap-lg-3">
        <span class="fs-5 bg-success bg-gradient text-light pt-2 pb-2 ps-1 pe-1 rounded-3 shadow d-none d-sm-block">
          <i class="fa-solid fa-quote-left align-middle"></i>
          <i class="fa-solid fa-quote-right align-middle"></i>
        </span>
        <div class="d-flex flex-column">
          <p class="text-secondary fs-7 p-0 m-0 text-break">{{quote.quoteText}}</p>
        </div>
      </div>
      <div class="col-12 col-sm-3 col-md-2 d-flex align-items-center justify-content-sm-center">
        <span class="fs-7 text-secondary text-break">{{quote.source}}</span>
      </div>
      <div class="col-12 col-sm-3 col-md-2 col-lg-2 d-flex align-items-center justify-content-sm-center gap-2">
        <a
          class="btn border rounded-3 fs-7"
          [routerLink]="['/quotes/update', quote.id]"
          aria-label="Edit quote"
        >
          <i class="fa-solid fa-pencil align-middle"></i>
        </a>
        <button
          type="button"
          class="btn border rounded-3 fs-7"
          aria-label="Delete quote"
          (click)="openModal()"
        >
          <i class="fa-solid fa-trash align-middle"></i>
        </button>
      </div>
    </div>
  `,
  styleUrl: './quote-entry.scss',
})
export class QuoteEntry {
  @Input() quote!: Quote;
  @Output() deleteRequested = new EventEmitter<number>();

  private modalService = inject(NgbModal);

  openModal(): void {
    const modalRef = this.modalService.open(DeleteEntryModal);
    modalRef.componentInstance.title = 'Remove this quote?';
    modalRef.componentInstance.body = 'It will be removed from your list of quotes.'
    modalRef.componentInstance.submitLabel = 'Delete quote';

    modalRef.closed.subscribe(() => {
      this.deleteRequested.emit(this.quote.id);
    });
  }
}
