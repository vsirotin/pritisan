import { IClosedEvent } from "../../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";

export class SaverClosedEvent {
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

  private *dateRange(start: Date, end: Date): Generator<Date> {
    let current = new Date(start);
    while (current <= end) {
      yield new Date(current);
      current.setDate(current.getDate() + 1);
    }
  }

  saveClosedEventImpi(closedEvent: IClosedEvent): void {
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
}