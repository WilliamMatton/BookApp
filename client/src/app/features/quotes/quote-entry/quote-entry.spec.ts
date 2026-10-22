import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEntry } from './quote-entry';

describe('QuoteEntry', () => {
  let component: QuoteEntry;
  let fixture: ComponentFixture<QuoteEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
