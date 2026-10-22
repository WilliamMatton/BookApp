import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-error',
  imports: [],
  template: `
    <div class="container d-flex flex-column align-items-center justify-content-center mt-md-5">
      <div class="row">
        <div class="col">
          <span class="text-danger fs-1">
            <i class="fa-regular fa-circle-xmark"></i>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <span class="text-danger fw-semibold">
            {{ message }}
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './content-error.scss',
})
export class ContentError {
  @Input() message = '';
}
