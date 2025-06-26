
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IClosedEvent, IRunningEvent, ITimePoint, ITimePointEvent } from "../../commons/event-commons";

export interface ICurrentEventPersistence {
  saveClosedEvent(closedEvent: IClosedEvent): void;
  saveTimePointEvent(timePointEvent: ITimePointEvent): void;
  saveRunningEvent(runningEvent: IRunningEvent): void;
}

// This class implements the ICurrentEventPersistence interface to save events in localStorage.
// It provides methods to save closed events, running events, and time point events.
// Each event is stored in a specific bucket based on its date, and events are sorted by their start time or event time point.
// The date range for closed events is handled by iterating through each day between the start and end times of the event.
// The events are stored in JSON format in localStorage, with keys formatted as 'YYYY-MM-DD' for closed and time point events, and
class EventsSaver implements ICurrentEventPersistence {

  // Key used for storing running events in localStorage
  // It is static because testing 
  static runningEventsKey = "RUNNINIG_EVENTS";

  //--- Common serviced

  private logger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventsSaver");

  saveClosedEvent(closedEvent: IClosedEvent): void {

    this.logger.debug("saveClosedEvent: ", closedEvent);
   
    if (this.compareTimePoints(closedEvent.startTime, closedEvent.endTime) > 0) {
      throw new Error('startTime must be before or equal to endTime');
    }

    const startDate = new Date(closedEvent.startTime.year, closedEvent.startTime.month - 1, closedEvent.startTime.dayOfMonth, closedEvent.startTime.hour ?? 0, closedEvent.startTime.minute ?? 0, 0, 0);
    const endDate = new Date(closedEvent.endTime.year, closedEvent.endTime.month - 1, closedEvent.endTime.dayOfMonth, closedEvent.endTime.hour ?? 0, closedEvent.endTime.minute ?? 0, 0, 0);

    for (const day of this.dateRange(startDate, endDate)) {
      const key = this.formatDateKey(day);
      const bucketStr = localStorage.getItem(key);
      let bucket: IClosedEvent[] = bucketStr ? JSON.parse(bucketStr) : [];
      bucket.push(closedEvent);
      bucket.sort((a, b) => this.compareEvents(a, b)); //This type of call because of callback call (behaviour of JavaScript)
      localStorage.setItem(key, JSON.stringify(bucket));
    }
  }

  saveRunningEvent(runningEvent: IRunningEvent): void {

    this.logger.debug("saveRunningEvent: ", runningEvent);
    const key = EventsSaver.runningEventsKey; // Use a fixed key for running events
    const bucketStr = localStorage.getItem(key);
    let bucket: IRunningEvent[] = bucketStr ? JSON.parse(bucketStr) : [];
    bucket.push(runningEvent);
    // Sort by startTime
    bucket.sort((a, b) => this.compareTimePoints(a.startTime, b.startTime));
    localStorage.setItem(key, JSON.stringify(bucket));
  }

  saveTimePointEvent(timePointEvent: ITimePointEvent): void {
    this.logger.debug("saveTimePointEvent: ", timePointEvent);

    const key = "" + timePointEvent.eventTimePoint.year + "-" 
      + timePointEvent.eventTimePoint.month 
      + "-" + timePointEvent.eventTimePoint.dayOfMonth;
    const bucketStr = localStorage.getItem(key);
    let bucket: ITimePointEvent[] = bucketStr ? JSON.parse(bucketStr) : [];
    bucket.push(timePointEvent);
    // Sort by eventTimePoint
    bucket.sort((a, b) => this.compareTimePoints(a.eventTimePoint, b.eventTimePoint));
    localStorage.setItem(key, JSON.stringify(bucket));
  }

  private formatDateKey(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

private compareEvents(a: IClosedEvent, b: IClosedEvent): number {
  // Compare by startTime first
  const startCmp = this.compareTimePoints(a.startTime, b.startTime);
  if (startCmp !== 0) return startCmp;
  // If startTime is equal, compare by endTime
  return this.compareTimePoints(a.endTime, b.endTime);
}

private compareTimePoints(a: ITimePoint, b: ITimePoint): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  if (a.dayOfMonth !== b.dayOfMonth) return a.dayOfMonth - b.dayOfMonth;
  if (a.hour !== b.hour) return a.hour - b.hour;
  return a.minute - b.minute;
}

  private *dateRange(start: Date, end: Date): Generator<Date> {
    let current = new Date(start);
    while (current <= end) {
      yield new Date(current);
      current.setDate(current.getDate() + 1);
    }
  }
}

// This class provides a static interface to access the current event persistence implementation.
// It acts as a facade for the EventsSaver class, allowing other parts of the application to
// save events without needing to know the details of how they are stored.
export class TimeSeriesDB {

  static getCurrentEventPersistence(): ICurrentEventPersistence {
    return TimeSeriesDB.eventsSaver;
  }

  private static eventsSaver : ICurrentEventPersistence = new EventsSaver();
 
}




