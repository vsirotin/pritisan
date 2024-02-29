import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitySelectionComponent } from './activity-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActivitySelectionComponent', () => {
  let component: ActivitySelectionComponent;
  let fixture: ComponentFixture<ActivitySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySelectionComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
