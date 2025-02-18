import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsDashboardComponent } from './suggestions-dashboard.component';

describe('SuggestionsDashboardComponent', () => {
  let component: SuggestionsDashboardComponent;
  let fixture: ComponentFixture<SuggestionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
