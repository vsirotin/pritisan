import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeSelectingComponent } from './activity-type-selecting.component';

describe('ActivityTypeSelectingComponent', () => {
  let component: ActivityTypeSelectingComponent;
  let fixture: ComponentFixture<ActivityTypeSelectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTypeSelectingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityTypeSelectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
