import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventToolbarComponent } from './current-event-toolbar.component';

describe('CurrentEventToolbarComponent', () => {
  let component: CurrentEventToolbarComponent;
  let fixture: ComponentFixture<CurrentEventToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentEventToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentEventToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
