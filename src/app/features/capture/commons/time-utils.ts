import { ITimePoint } from "./event-commons";


export class TimeUtils {
  static compareTimePoints(a: ITimePoint, b: ITimePoint): number {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    if (a.dayOfMonth !== b.dayOfMonth) return a.dayOfMonth - b.dayOfMonth;
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.minute - b.minute;
  }
}
