import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningEventsComponent } from './running-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RunningActionsComponent', () => {
  let component: RunningEventsComponent;
  let fixture: ComponentFixture<RunningEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningEventsComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('by empty list of running events', () => {
    xit('it presented only with header with corresponded text ', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('by not empty list of running events', () => {
    xit('it presented oppened with header with corresponded text ', () => {
      expect(component).toBeTruthy();
    });

    xit('it containts three pairs <label, icon> ', () => {
      expect(component).toBeTruthy();
    });

    xit('it can be closed and in closed state its header containts corresponded text ', () => {
      expect(component).toBeTruthy();
    });

    xit('Complete selected works correctly by single selection ', () => {
      expect(component).toBeTruthy();
    });

    xit('Complete selected works correctly by multiply selection ', () => {
      expect(component).toBeTruthy();
    });

    xit('Delete selected works correctly by single selection ', () => {
      expect(component).toBeTruthy();
    });

    xit('Delete selected works correctly by multiply selection ', () => {
      expect(component).toBeTruthy();
    });

    xit('Cancel/reset works correctly by single selection ', () => {
      expect(component).toBeTruthy();
    });

    xit('Cancel/reset works correctly by multiply selection ', () => {
      expect(component).toBeTruthy();
    });

    
    describe('by a few  running events', () => {
      xit('it containts N lines by count running events N <=3 ', () => {
          expect(component).toBeTruthy();
        });
  
    });
    
    describe('by a many running events', () => {
    
      xit('it containts 3 lines by count running events N > 3 ', () => {
        expect(component).toBeTruthy();
      });
    });

    describe('by change a list of running events its presentation changes correctly', () => {
    
      xit('it containts right number of lines ', () => {
        expect(component).toBeTruthy();
      });

      xit('it is correctly ordered ', () => {
        expect(component).toBeTruthy();
      });

    });

  });
});

