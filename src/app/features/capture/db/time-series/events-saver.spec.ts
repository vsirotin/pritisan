import { IClosedEvent, IRunningEvent, ITimePointEvent } from "../../commons/event-commons";
import { ICurrentEventPersistence, RUNNING_EVENT_KEY, TimeSeriesDB } from "./time-series-db";


describe('EventSaver...', () => {
  let saver: ICurrentEventPersistence;

  beforeEach(() => {
    saver = TimeSeriesDB.getCurrentEventPersistence();
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() => null);
  });

  describe('SaverClosedEvent', () => {

    it('should throw error if startTime > endTime', () => {
      const event: IClosedEvent = {
        startTime: { year: 2025, month: 1, dayOfMonth: 3, hour: 10, minute: 0 },
        endTime: { year: 2025, month: 1, dayOfMonth: 2, hour: 10, minute: 0 },
        eventTypeId: 1,
        eventTypeName: 'Test',
        activityTypeId: 'A',
        activityTypeName: 'Activity'
      };
      expect(() => saver.saveClosedEvent(event)).toThrowError('startTime must be before or equal to endTime');
    });

    it('should save event in correct bucket for single day', () => {
      const event: IClosedEvent = {
        startTime: { year: 2025, month: 1, dayOfMonth: 3, hour: 10, minute: 0 },
        endTime: { year: 2025, month: 1, dayOfMonth: 3, hour: 12, minute: 0 },
        eventTypeId: 1,
        eventTypeName: 'Test',
        activityTypeId: 'A',
        activityTypeName: 'Activity'
      };
      const key = '2025-01-03';
      (localStorage.setItem as jasmine.Spy).calls.reset();
      saver.saveClosedEvent(event);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, jasmine.any(String));
    });

    it('should save event in all buckets for multi-day event', () => {
      const event: IClosedEvent = {
        startTime: { year: 2025, month: 1, dayOfMonth: 3, hour: 10, minute: 0 },
        endTime: { year: 2025, month: 1, dayOfMonth: 5, hour: 12, minute: 0 },
        eventTypeId: 1,
        eventTypeName: 'Test',
        activityTypeId: 'A',
        activityTypeName: 'Activity'
      };
      (localStorage.setItem as jasmine.Spy).calls.reset();
      saver.saveClosedEvent(event);
      expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-03', jasmine.any(String));
      expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-04', jasmine.any(String));
      expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-05', jasmine.any(String));
    });
  });

  describe('TimeEventsSaver', () => {

    it('should save time point event in correct bucket', () => {
      const event: ITimePointEvent = {
        eventTimePoint: { year: 2025, month: 1, dayOfMonth: 11, hour: 9, minute: 30 },
        eventTypeId: 2,
        eventTypeName: 'Point',
        activityTypeId: 'B',
        activityTypeName: 'Activity2'
      };
      const key = '2025-01-11';
      (localStorage.setItem as jasmine.Spy).calls.reset();
      saver.saveTimePointEvent(event);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, jasmine.any(String));
    });
  });

  describe('RunninigEventsSaver', () => {

    it('should save running event ', () => {
      const event: IRunningEvent = {
        startTime: { year: 2025, month: 1, dayOfMonth: 10, hour: 8, minute: 0 },
        eventTypeId: 1,
        eventTypeName: 'Run',
        activityTypeId: 'A',
        activityTypeName: 'Activity'
      };
      const key = RUNNING_EVENT_KEY; // Use the fixed key for running events
      (localStorage.setItem as jasmine.Spy).calls.reset();
      saver.saveRunningEvent(event);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, jasmine.any(String));
    });

  });
});