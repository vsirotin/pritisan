import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceTypeSettingComponent } from './ressource-type-setting.component';

describe('RessourceTypeSettingComponent', () => {
  let component: RessourceTypeSettingComponent;
  let fixture: ComponentFixture<RessourceTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourceTypeSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessourceTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
