import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountSettingComponent } from './amount-setting.component';

describe('AmountSettingComponent', () => {
  let component: AmountSettingComponent;
  let fixture: ComponentFixture<AmountSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
