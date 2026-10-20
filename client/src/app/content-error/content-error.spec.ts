import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentError } from './content-error';

describe('ContentError', () => {
  let component: ContentError;
  let fixture: ComponentFixture<ContentError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
