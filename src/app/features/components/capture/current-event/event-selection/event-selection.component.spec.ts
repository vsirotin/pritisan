import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSelectionComponent } from './event-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActivitySelectionComponent', () => {
  let component: EventSelectionComponent;
  let fixture: ComponentFixture<EventSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSelectionComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
