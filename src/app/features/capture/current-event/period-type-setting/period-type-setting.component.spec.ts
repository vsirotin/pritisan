import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTypeSettingComponent } from './period-type-setting.component';

describe('PeriodTypeSettingComponent', () => {
  let component: PeriodTypeSettingComponent;
  let fixture: ComponentFixture<PeriodTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
