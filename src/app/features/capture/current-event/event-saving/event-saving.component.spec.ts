import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSavingComponent } from './event-saving.component';

describe('EventSavingComponent', () => {
  let component: EventSavingComponent;
  let fixture: ComponentFixture<EventSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
