import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfTimesSettingComponent } from './number-of-times-setting.component';

describe('NumberOfTimesSettingComponent', () => {
  let component: NumberOfTimesSettingComponent;
  let fixture: ComponentFixture<NumberOfTimesSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberOfTimesSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberOfTimesSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
