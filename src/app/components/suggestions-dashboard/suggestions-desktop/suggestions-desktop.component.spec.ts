import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsDesktopComponent } from './suggestions-desktop.component';

describe('SuggestionsDesktopComponent', () => {
  let component: SuggestionsDesktopComponent;
  let fixture: ComponentFixture<SuggestionsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
