import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePointSettingComponent } from './time-point-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TimePointSettingComponent', () => {
  let component: TimePointSettingComponent;
  let fixture: ComponentFixture<TimePointSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePointSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimePointSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function hasElementAndLabel(angularElementName: string, index: number, labelText: string) {
    const element = fixture.debugElement.queryAll(By.css(angularElementName))[index];
    expect(element).toBeTruthy();
    expect(element.nativeElement.textContent).toContain(labelText);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date control', () => {
    const element = fixture.debugElement.query(By.css('mat-form-field.date-control'));
    expect(element).toBeTruthy();
  });

  it('should have hour control', () => {
    hasElementAndLabel('mat-form-field.time-control', 0, 'Hour');  
  });

  it('should should have minute control', () => {
    hasElementAndLabel('mat-form-field.time-control', 1, 'Minutes');
  });
});
