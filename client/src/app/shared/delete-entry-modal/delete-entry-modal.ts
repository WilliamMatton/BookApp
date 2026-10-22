import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../features/books/book'; 

@Component({
  selector: 'app-delete-entry-modal',
  imports: [],
  template: `
    <div class="modal-header border-0">
      <span class="modal-title fw-bold fs-5 text-break">{{ title }}</span>
    </div>
    <div class="modal-body">
      <p class="text-secondary text-break">{{ body }}</p>
    </div>
    <div class="modal-footer border-0">
      <button type="button" class="btn btn-light" (click)="activeModal.dismiss()">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close()">{{ submitLabel }}</button>
    </div>
  `,
  styleUrl: './delete-entry-modal.scss',
})
export class DeleteEntryModal {
  @Input() title = '';
  @Input() body = '';
  @Input() submitLabel = 'Delete';

  readonly activeModal = inject(NgbActiveModal);
}