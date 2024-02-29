import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CaptureComponent } from './capture.component';
import { By } from '@angular/platform-browser';

describe('CaptureComponent', () => {
  let component: CaptureComponent;
  let fixture: ComponentFixture<CaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function hasElement(angularElementName: string) {
    const element = fixture.debugElement.query(By.css(angularElementName));
    expect(element).toBeTruthy();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have toolbar', () => {
    hasElement('mat-toolbar');   
  });

  it('should have app-running-activities', () => {
    hasElement('app-running-activities');   
  });

  it('should have app-activity-selection', () => {
    hasElement('app-activity-selection');   
  });

  it('should have app-time-setting', () => {
    hasElement('app-time-setting');   
  });

  it('should have app-parameters-setting', () => {
    hasElement('app-parameters-setting');   
  });
});
