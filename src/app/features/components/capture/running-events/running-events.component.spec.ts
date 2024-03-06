import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningEventsComponent } from './running-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RunningActionsComponent', () => {
  let component: RunningEventsComponent;
  let fixture: ComponentFixture<RunningEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningEventsComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
