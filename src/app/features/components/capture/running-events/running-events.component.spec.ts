import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningEventsComponent } from './running-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IRunningEventsBusinessLogicModel, RunningEventsBusinessLogicModel } from '../model/capture/business-logic-model/running-events-business-logic-model';
import { IPersistedEvent, RunningEventsPersistence, getTimeBeforeNow } from '../../../../shared/classes/db/time-series-db';
import { Logger } from '../../../../shared/services/logging/logger';
import { By } from '@angular/platform-browser';

describe('RunningActionsComponent', () => {
  let component: RunningEventsComponent;
  let fixture: ComponentFixture<RunningEventsComponent>;
  let businessLogicModel: IRunningEventsBusinessLogicModel;
  let logger: Logger;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningEventsComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningEventsComponent);
    component = fixture.componentInstance;

    logger = new Logger();
    businessLogicModel = new RunningEventsBusinessLogicModel(logger);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('by empty list of running events', () => {

    class RunningEventsPersistenceExtend1 extends RunningEventsPersistence{
      override async readRunningEvents(): Promise<IPersistedEvent[]> {
        return [];
      }
    }

    beforeEach(async () => {
 
      businessLogicModel.runningEventsDB = new RunningEventsPersistenceExtend1(logger);
      component.uiModel.setBusinessLogicModel(businessLogicModel);
      await businessLogicModel.readRunninfEventsFromDB();
      fixture.detectChanges();
    });

    it('accordion is closed visually ', () => {
      expect(component.isExpanded).toBeFalse();
    });

    it('it presented 0 running events ', () => {
      expect(component.countRunningEvents).toEqual(0);
    });

    it('it presented oppened with header with corresponded number of running events (0) ', () => {
      let  counter = fixture.debugElement.query(By.css('mat-panel-description'));
      expect(counter.nativeElement.textContent.trim()).toBe("0");
    });

    it('it containts 3 pairs <label, icon> ', () => {
      let  buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(3);
    });

    it('should have 1 row (only header)', () => {
      fixture.detectChanges();
      let rows = fixture.debugElement.queryAll(By.css('tr'));
      expect(rows.length).toBe(1);
    });

  });

  describe('by not empty list of running events', () => {

    class RunningEventsPersistenceExtend2 extends RunningEventsPersistence{
      override async readRunningEvents(): Promise<IPersistedEvent[]> {
        const TEST_EVENTS: IPersistedEvent[] = [
          {id: 21, start: getTimeBeforeNow(0, 1, 5), fin: null, typeId: "1", details: "event 21"},
          {id: 22, start: getTimeBeforeNow(0, 16, 35), fin: null, typeId: "2", details: "event 22"},
          {id: 23, start: getTimeBeforeNow(3, 4, 45), fin: null, typeId: "3", details: "event 23"},
          {id: 24, start: getTimeBeforeNow(0, 0, 0), fin: null, typeId: "2", details: "event 24"},
        ]
    
        return TEST_EVENTS;
      }
    }

    beforeEach(async () => {
 
      businessLogicModel.runningEventsDB = new RunningEventsPersistenceExtend2(logger);
      component.uiModel.setBusinessLogicModel(businessLogicModel);
      await businessLogicModel.readRunninfEventsFromDB();
      fixture.detectChanges();
    });

    it('accordion is open visually ', () => {
      expect(component.isExpanded).toBeTrue();
    });

    it('it presented 4 running events in header ', () => {
      expect(component.countRunningEvents).toEqual(4);
    });

    it('it presented oppened with header with corresponded number of running events (4) ', () => {
      let  counter = fixture.debugElement.query(By.css('mat-panel-description'));
      expect(counter.nativeElement.textContent.trim()).toBe("4");
    });

    it('it containts 3 buttons ', () => {
      let  buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(3);
    });

    it('it containts 3 buttons and they are disabled', () => {
        let  buttons = fixture.debugElement.queryAll(By.css('button'));
        buttons.forEach(button => {    
        expect(button.nativeElement.disabled).toBeTrue();
      });
    });

    it('should have 5 rows (header + 4 rows with data)', () => {
      fixture.detectChanges();
      let rows = fixture.debugElement.queryAll(By.css('tr'));
      expect(rows.length).toBe(5);
    });

    it('accordion can be closed and in closed state its header contains corresponded text ', () => {
      // Get the accordion panel
      let panel = fixture.debugElement.query(By.css('mat-expansion-panel'));
      
      // Close the panel
      panel.componentInstance.expanded = false;
      fixture.detectChanges();

      // Check that the panel is closed
      expect(panel.componentInstance.expanded).toBe(false);

      // Get the header element
      let header = fixture.debugElement.query(By.css('.mat-expansion-panel-header-title'));

      // Check that the header contains the correct text
      expect(header.nativeElement.textContent).toContain('Running events');

      // Check correct number of running events
      let  counter = fixture.debugElement.query(By.css('mat-panel-description'));
      expect(counter.nativeElement.textContent.trim()).toBe("4");
    });

    it('Without selection some row(s) via checkbox, all three buttons are disabled ', () => {

      // Get the buttons
      let buttons = fixture.debugElement.queryAll(By.css('button'));

      // Check that all buttons are enabled
      buttons.forEach(button => {
        expect(button.nativeElement.disabled).toBeTrue();
      });
    });

    it('By selecting all rows via checkbox, all three buttons will be enabled ', () => {
      // Simulate checking the checkbox to select all rows
      component.selection.select(...component.dataSource.data);
      fixture.detectChanges();

      // Get the buttons
      let buttons = fixture.debugElement.queryAll(By.css('button'));

      // Check that all buttons are enabled
      buttons.forEach(button => {
        expect(button.nativeElement.disabled).toBeFalsy();
      });
    });



    it('After selection of first row and click on first button all buttons will be disabled  ', async () => {
      // Simulate checking the checkbox to select the first row
      component.selection.select(component.dataSource.data[0]);
      fixture.detectChanges();

      // Get the first button
      let button = fixture.debugElement.query(By.css('button'));

      // Click the button
      button.nativeElement.click();
      component.onComplete();

      // Wait for all asynchronous tasks to complete
      await fixture.whenStable();

      // Trigger change detection
      fixture.detectChanges();

      // Get all buttons
      let buttons = fixture.debugElement.queryAll(By.css('button'));

      // Check that all buttons are disabled
      buttons.forEach(button => {
        expect(button.nativeElement.disabled).toBeTrue();
      });
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

