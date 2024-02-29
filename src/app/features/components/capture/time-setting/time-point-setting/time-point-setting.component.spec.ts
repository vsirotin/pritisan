import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePointSettingComponent } from './time-point-setting.component';

describe('TimePointSettingComponent', () => {
  let component: TimePointSettingComponent;
  let fixture: ComponentFixture<TimePointSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePointSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimePointSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
