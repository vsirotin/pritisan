import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeSettingComponent } from './event-type-setting.component';

describe('ActivityTypeSelectingComponent', () => {
  let component: EventTypeSettingComponent;
  let fixture: ComponentFixture<EventTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTypeSettingComponent]
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
