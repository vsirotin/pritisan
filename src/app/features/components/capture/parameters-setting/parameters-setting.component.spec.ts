import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersSettingComponent } from './parameters-setting.component';

describe('ParametersSettingComponent', () => {
  let component: ParametersSettingComponent;
  let fixture: ComponentFixture<ParametersSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersSettingComponent]
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
