import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSuggestComponent } from './space-suggest.component';

describe('SpaceDetailsComponent', () => {
  let component: SpaceSuggestComponent;
  let fixture: ComponentFixture<SpaceSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceSuggestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpaceSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
