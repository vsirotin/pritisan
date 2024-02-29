import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningActivitiesComponent } from './running-activities.component';

describe('RunningActionsComponent', () => {
  let component: RunningActivitiesComponent;
  let fixture: ComponentFixture<RunningActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
