import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeIntervalSettingComponent } from './time-interval-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TimeSettingComponent', () => {
  let component: TimeIntervalSettingComponent;
  let fixture: ComponentFixture<TimeIntervalSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeIntervalSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeIntervalSettingComponent);
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
