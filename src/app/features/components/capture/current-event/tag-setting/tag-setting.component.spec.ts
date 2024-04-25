import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSettingComponent } from './tag-setting.component';

describe('TagSettingComponent', () => {
  let component: TagSettingComponent;
  let fixture: ComponentFixture<TagSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
