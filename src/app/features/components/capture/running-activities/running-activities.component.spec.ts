import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningActivitiesComponent } from './running-activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RunningActionsComponent', () => {
  let component: RunningActivitiesComponent;
  let fixture: ComponentFixture<RunningActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningActivitiesComponent, BrowserAnimationsModule]
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
