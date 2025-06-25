import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventTypeSettingComponent } from './event-type-setting';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ActivitySelectionComponent', () => {
  let component: EventTypeSettingComponent;
  let fixture: ComponentFixture<EventTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTypeSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
