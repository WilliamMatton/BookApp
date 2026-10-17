import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';

@Component({
  selector: 'app-delete-book-modal',
  imports: [],
  template: `
    <div class="modal-header border-0">
      <span class="modal-title fw-bold fs-5">Remove this book?</span>
    </div>
    <div class="modal-body">
      <p class="text-secondary">"{{ book.title }}" will be removed from your library.</p>
    </div>
    <div class="modal-footer border-0">
      <button type="button" class="btn btn-light" (click)="activeModal.dismiss()">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close()">Delete book</button>
    </div>
  `,
  styleUrl: './delete-book-modal.scss',
})
export class DeleteBookModal {
  @Input() book!: Book;

  activeModal = inject(NgbActiveModal);
}