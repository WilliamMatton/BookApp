import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntryModal } from './delete-entry-modal';

describe('DeleteBookModal', () => {
  let component: DeleteEntryModal;
  let fixture: ComponentFixture<DeleteEntryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEntryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEntryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
