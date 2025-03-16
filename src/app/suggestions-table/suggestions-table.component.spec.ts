import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsTableComponent } from './suggestions-table.component';

describe('SuggestionsTableComponent', () => {
  let component: SuggestionsTableComponent;
  let fixture: ComponentFixture<SuggestionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
