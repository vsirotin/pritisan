import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowEventProcessingComponent } from './workflow-event-processing.component';

describe('WorkflowEventProcessingComponent', () => {
  let component: WorkflowEventProcessingComponent;
  let fixture: ComponentFixture<WorkflowEventProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowEventProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowEventProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
