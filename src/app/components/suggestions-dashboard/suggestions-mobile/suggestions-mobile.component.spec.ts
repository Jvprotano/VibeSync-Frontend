import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsMobileComponent } from './suggestions-mobile.component';

describe('SuggestionsMobileComponent', () => {
  let component: SuggestionsMobileComponent;
  let fixture: ComponentFixture<SuggestionsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
