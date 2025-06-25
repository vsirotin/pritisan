import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventComponent } from './current-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('CurrentEventComponent', () => {
  let component: CurrentEventComponent;
  let fixture: ComponentFixture<CurrentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentEventComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
