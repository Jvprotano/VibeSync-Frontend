import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationMessageComponent } from './email-confirmation-message.component';

describe('EmailConfirmationComponent', () => {
  let component: EmailConfirmationMessageComponent;
  let fixture: ComponentFixture<EmailConfirmationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailConfirmationMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
