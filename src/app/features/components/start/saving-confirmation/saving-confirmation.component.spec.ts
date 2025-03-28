import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingConfirmationComponent } from './saving-confirmation.component';

describe('SavingConfirmationComponent', () => {
  let component: SavingConfirmationComponent;
  let fixture: ComponentFixture<SavingConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
