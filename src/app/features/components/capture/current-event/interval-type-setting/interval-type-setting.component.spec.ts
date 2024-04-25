import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTypeSettingComponent } from './interval-type-setting.component';

describe('IntervalTypeSettingComponent', () => {
  let component: IntervalTypeSettingComponent;
  let fixture: ComponentFixture<IntervalTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
