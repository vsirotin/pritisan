import { IClosedEvent } from '../../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { SaverClosedEvent } from './saver-closed-events';

describe('SaverClosedEvent', () => {
  let saver: SaverClosedEvent;

  beforeEach(() => {
    saver = new SaverClosedEvent();
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() => null);
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
    expect(() => saver.saveClosedEventImpi(event)).toThrowError('startTime must be before or equal to endTime');
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
    saver.saveClosedEventImpi(event);
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
    saver.saveClosedEventImpi(event);
    expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-03', jasmine.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-04', jasmine.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('2025-01-05', jasmine.any(String));
  });
});