import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySelectionComponent } from './activity-selection.component';

describe('ActivitySelectionComponent', () => {
  let component: ActivitySelectionComponent;
  let fixture: ComponentFixture<ActivitySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySelectionComponent]
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
