import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRessourceProcessingComponent } from './workflow-ressource-processing.component';

describe('WorkflowRessourceProcessingComponent', () => {
  let component: WorkflowRessourceProcessingComponent;
  let fixture: ComponentFixture<WorkflowRessourceProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowRessourceProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowRessourceProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
