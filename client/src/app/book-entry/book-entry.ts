import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book, ReadingStatus } from '../book';
import { DeleteEntryModal } from '../delete-entry-modal/delete-entry-modal';

@Component({
  selector: 'app-book-entry',
  imports: [NgClass, RouterLink],
  template: `
    <div class="container p-0">
      <div class="row row-gap-3 pt-3 pb-3 p-lg-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-8 col-xl-8 d-flex align-items-center column-gap-2 column-gap-lg-3">
          <span class="fs-5 bg-danger bg-gradient text-light pt-4 pb-4 ps-3 pe-3 rounded-3 shadow"><i class="fa-solid fa-book align-middle"></i></span>
          <div class="d-flex flex-column">
            <p class="fw-semibold p-0 m-0">{{book.title}}</p>
            <p class="text-secondary fs-7 p-0 m-0">{{book.author}}</p>
          </div>
        </div>
        <div class="col-12 col-sm-2 col-md-2 col-lg-1 d-flex align-items-center justify-content-sm-center">
          <span class="fs-7 fw-medium ps-2 pe-2 rounded-pill"
            [ngClass]="statusClasses[book.status]"
          >
            {{book.status}}
          </span>
        </div>
        <div class="col-12 col-sm-1 col-md-2 col-lg-1 d-flex align-items-center justify-content-sm-center">
          <span class="fs-7 text-secondary">{{book.yearPublished}}</span>
        </div>
        <div class="col-12 col-sm-3 col-md-2 col-lg-2 d-flex align-items-center justify-content-sm-center gap-2">
          <a
            class="btn border rounded-3 fs-7 opacity-75 update-book-button"
            [routerLink]="['/books/update', book.id]"
            aria-label="Edit book"
          >
            <i class="fa-solid fa-pencil align-middle"></i>
          </a>
          <button
            type="button"
            class="btn border rounded-3 fs-7 opacity-75 delete-book-button"
            aria-label="Delete book"
            (click)="openModal()"
          >
            <i class="fa-solid fa-trash align-middle"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './book-entry.scss',
})
export class BookEntry {
  @Input() book!: Book;
  @Output() deleteRequested = new EventEmitter<number>();

  readonly statusClasses: Record<ReadingStatus, string> = {
    Reading: 'text-reading bg-reading-bg',
    Read: 'text-read bg-read-bg',
    ToRead: 'text-to-read bg-to-read-bg',
  };

  private modalService = inject(NgbModal);

  openModal(): void {
    const modalRef = this.modalService.open(DeleteEntryModal);
    modalRef.componentInstance.title = 'Remove this book?';
    modalRef.componentInstance.body = `"${this.book.title}" will be removed from your library.`
    modalRef.componentInstance.submitLabel = 'Delete book';

    modalRef.closed.subscribe(() => {
      this.deleteRequested.emit(this.book.id);
    });
  }
}
