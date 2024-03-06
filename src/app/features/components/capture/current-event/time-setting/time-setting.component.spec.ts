import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSettingComponent } from './time-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TimeSettingComponent', () => {
  let component: TimeSettingComponent;
  let fixture: ComponentFixture<TimeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two app-time-point-setting controls', () => {
    const elements = fixture.debugElement.queryAll(By.css('app-time-point-setting'));
    expect(elements.length).toBe(2);
  });
});
