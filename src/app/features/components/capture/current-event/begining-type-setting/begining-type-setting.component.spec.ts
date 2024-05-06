import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginingTypeSettingComponent } from './begining-type-setting.component';

describe('UnitsSettingComponent', () => {
  let component: BeginingTypeSettingComponent;
  let fixture: ComponentFixture<BeginingTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginingTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeginingTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
