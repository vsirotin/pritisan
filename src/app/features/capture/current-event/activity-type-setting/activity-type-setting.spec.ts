import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeSettingComponent } from './activity-type-setting';

describe('ActivityTypeSelectingComponent', () => {
  let component: ActivityTypeSettingComponent;
  let fixture: ComponentFixture<ActivityTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
