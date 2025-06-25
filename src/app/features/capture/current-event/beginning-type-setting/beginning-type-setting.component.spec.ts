import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginningTypeSettingComponent } from './beginning-type-setting.component';

describe('UnitsSettingComponent', () => {
  let component: BeginningTypeSettingComponent;
  let fixture: ComponentFixture<BeginningTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginningTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeginningTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
