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

    it('it presented 0 running events ', () => {
      expect(component.countRunningEvents).toEqual(4);
    });

    it('it presented oppened with header with corresponded number of running events (4) ', () => {
      let  counter = fixture.debugElement.query(By.css('mat-panel-description'));
      expect(counter.nativeElement.textContent.trim()).toBe("4");
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

