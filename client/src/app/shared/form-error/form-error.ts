import { Component, Input, output } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-error',
  imports: [NgbAlertModule],
  template: `
    <ngb-alert
      type="danger"
      class="text-danger text-break"
      (closed)="dismissed.emit()"
    >
      {{ message }}
    </ngb-alert>
  `,
  styleUrl: './form-error.scss',
})
export class FormError {
  @Input() message = '';
  readonly dismissed = output<void>();
}
