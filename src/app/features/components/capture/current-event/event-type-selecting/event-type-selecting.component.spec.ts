import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventTypeSelectingComponent } from './event-type-selecting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ActivitySelectionComponent', () => {
  let component: EventTypeSelectingComponent;
  let fixture: ComponentFixture<EventTypeSelectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTypeSelectingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventTypeSelectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
