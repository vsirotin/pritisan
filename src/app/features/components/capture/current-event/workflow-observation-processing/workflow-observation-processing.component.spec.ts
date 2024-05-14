import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowObservationProcessingComponent } from './workflow-observation-processing.component';

describe('WorkflowObservationProcessingComponent', () => {
  let component: WorkflowObservationProcessingComponent;
  let fixture: ComponentFixture<WorkflowObservationProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowObservationProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowObservationProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
