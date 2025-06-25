import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowTypeSelectionComponent } from './event-type-setting';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ActivitySelectionComponent', () => {
  let component: WorkflowTypeSelectionComponent;
  let fixture: ComponentFixture<WorkflowTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTypeSelectionComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
