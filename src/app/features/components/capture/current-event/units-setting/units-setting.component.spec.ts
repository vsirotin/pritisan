import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSettingComponent } from './units-setting.component';

describe('UnitsSettingComponent', () => {
  let component: UnitsSettingComponent;
  let fixture: ComponentFixture<UnitsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
