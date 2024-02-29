import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ParametersSettingComponent } from './parameters-setting.component';

describe('ParametersSettingComponent', () => {
  let component: ParametersSettingComponent;
  let fixture: ComponentFixture<ParametersSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
