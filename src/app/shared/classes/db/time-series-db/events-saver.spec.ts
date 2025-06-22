import { IClosedEvent, IRunningEvent, ITimePointEvent } from '../../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { EventsSaver } from './events-saver';

describe('SaverClosedEvent', () => {
  let saver: EventsSaver;

  beforeEach(() => {
    saver = new EventsSaver();
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() => null);
  });

   afterEach(() => {
    // Remove all localStorage keys that start with "2025-01" directly
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('2025-01')) {
        localStorage.removeItem(key);
      }
    }
  });

  it('should throw error if startTime > endTime', () => {
    const event: IClosedEvent = {
      startTime: { date: new Date('2025-01-03'), hour: 10, minute: 0 },
      endTime: { date: new Date('2025-01-02'), hour: 10, minute: 0 },
      eventTypeId: 1,
      eventTypeName: 'Test',
      activityTypeId: 'A',
      activityTypeName: 'Activity'
    };
    expect(() => saver.saveClosedEvent(event)).toThrowError('startTime must be before or equal to endTime');
  });

  it('should save event in correct bucket for single day', () => {
    const event: IClosedEvent = {
      startTime: { date: new Date('2025-01-03'), hour: 10, minute: 0 },
      endTime: { date: new Date('2025-01-03'), hour: 12, minute: 0 },
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
      startTime: { date: new Date('2025-01-03'), hour: 10, minute: 0 },
      endTime: { date: new Date('2025-01-05'), hour: 12, minute: 0 },
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
  let saver: EventsSaver;

  beforeEach(() => {
    saver = new EventsSaver();
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() => null);
  });

  afterEach(() => {
    // Clean up all keys starting with "2025-01"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('2025-01')) {
        localStorage.removeItem(key);
      }
    }
  });

  it('should save time point event in correct bucket', () => {
    const event: ITimePointEvent = {
      eventTimePoint: { date: new Date('2025-01-11'), hour: 9, minute: 30 },
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
  let saver: EventsSaver;

  beforeEach(() => {
    saver = new EventsSaver();
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() => null);
  });

  afterEach(() => {
    // Clean up all running events
    localStorage.removeItem(EventsSaver.runningEventsKey);
    
  });

  it('should save running event ', () => {
    const event: IRunningEvent = {
      startTime: { date: new Date('2025-01-10'), hour: 8, minute: 0 },
      eventTypeId: 1,
      eventTypeName: 'Run',
      activityTypeId: 'A',
      activityTypeName: 'Activity'
    };
    const key = EventsSaver.runningEventsKey; // Use the fixed key for running events
    (localStorage.setItem as jasmine.Spy).calls.reset();
    saver.saveRunningEvent(event);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, jasmine.any(String));
  });

});