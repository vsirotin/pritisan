import { IClosedEvent, IRunningEvent, ITimePoint, ITimePointEvent } from "../../../../features/capture/commons/event-commons";



export class EventsSaver {

  static runningEventsKey = "RUNNINIG_EVENTS";

  saveClosedEvent(closedEvent: IClosedEvent): void {
    const start = new Date(closedEvent.startTime.date);
    const end = new Date(closedEvent.endTime.date);

    if (start > end) {
      throw new Error('startTime must be before or equal to endTime');
    }

    for (const day of this.dateRange(start, end)) {
      const key = this.formatDateKey(day);
      const bucketStr = localStorage.getItem(key);
      let bucket: IClosedEvent[] = bucketStr ? JSON.parse(bucketStr) : [];
      bucket.push(closedEvent);
      bucket.sort(this.compareEvents);
      localStorage.setItem(key, JSON.stringify(bucket));
    }
  }

  saveRunningEvent(runningEvent: IRunningEvent): void {
    const key = EventsSaver.runningEventsKey; // Use a fixed key for running events
    const bucketStr = localStorage.getItem(key);
    let bucket: IRunningEvent[] = bucketStr ? JSON.parse(bucketStr) : [];
    bucket.push(runningEvent);
    // Sort by startTime
    bucket.sort((a, b) => this.compareTimePoints(a.startTime, b.startTime));
    localStorage.setItem(key, JSON.stringify(bucket));
  }

  saveTimePointEvent(timePointEvent: ITimePointEvent): void {
    const key = this.formatDateKey(new Date(timePointEvent.eventTimePoint.date));
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
    const aStart = new Date(a.startTime.date);
    const bStart = new Date(b.startTime.date);
    if (aStart < bStart) return -1;
    if (aStart > bStart) return 1;
    const aEnd = new Date(a.endTime.date);
    const bEnd = new Date(b.endTime.date);
    if (aEnd < bEnd) return -1;
    if (aEnd > bEnd) return 1;
    return 0;
  }

   private compareTimePoints(a: ITimePoint, b: ITimePoint): number {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
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