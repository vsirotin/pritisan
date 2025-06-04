import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IPersistedEvent } from "./time-series-db/time-series-db";


export interface IPersistedRunningEvents {

  readRunningEvents(): IPersistedEvent[];
  deleteEventsWithIds(eventIDs: number[]): Promise<void>;
  updateEvents(events: IPersistedEvent[]): Promise<void>;
}

export class RunningEventsPersistence implements IPersistedRunningEvents {
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.RunningEventsPersistence");
  constructor() {
    this.logger.log("RunningEventsPersistence created");
  }
  async deleteEventsWithIds(eventIDs: number[]): Promise<void> {
    this.logger.warn("RunningEventsPersistence.deleteEventsWithIds. Temporary solution. It should be replaced by real data from DB. Deleting: "
      + JSON.stringify(eventIDs));
    return Promise.resolve();
  }
  async updateEvents(events: IPersistedEvent[]): Promise<void> {
    this.logger.warn("RunningEventsPersistence.updateEvents. Temporary solution. It should be replaced by real data from DB. Updating: "
      + JSON.stringify(events));
    return Promise.resolve();
  }

  readRunningEvents(): IPersistedEvent[] {

    const TMP_PERSISTED_EVENTS: IPersistedEvent[] = [
      { id: 11, start: this.getTimeBeforeNow(0, 1, 4), fin: null, typeId: "1", details: "a" },
      { id: 12, start: this.getTimeBeforeNow(0, 12, 34), fin: null, typeId: "2", details: "b" },
      { id: 13, start: this.getTimeBeforeNow(2, 4, 44), fin: null, typeId: "3", details: "c" },
      { id: 14, start: this.getTimeBeforeNow(0, 0, 0), fin: null, typeId: "3", details: "c" }
    ];
    this.logger.warn("RunningEventsPersistence.readRunningEvents. Temporary solution. It should be replaced by real data from DB. Returning: "
      + JSON.stringify(TMP_PERSISTED_EVENTS));

    return TMP_PERSISTED_EVENTS;
  }

  getTimeBeforeNow(days: number, hours: number, minutes: number): Date {
    const t = new Date();
    t.setDate(t.getDate() - days);
    t.setHours(t.getHours() - hours);
    t.setMinutes(t.getMinutes() - minutes);
    return t;
  }

}
