
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";

export interface IPersistedEvent{
  id: number
  start: Data;
  fin: Data|null;
  typeId: string;
  details: string|null;
}

interface IEventsPersistence {
  saveEvent(event: IPersistedEvent): number;
  updateEvents(events: IPersistedEvent[]): void;
  deleteEvents(eventIds: number[]): void;
  readRunningEvents(): IPersistedEvent[];
}


export class EventsPersistence implements IEventsPersistence{
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventsPersistence");
  constructor(){
    this.logger.log("EventsPersistence created");
  }

  saveEvent(event: IPersistedEvent): number{
    throw new Error("Method not implemented.");
  }
  updateEvents(events: IPersistedEvent[]): void{
    throw new Error("Method not implemented.");
  }
  deleteEvents(eventIds: number[]): void{
    throw new Error("Method not implemented.");
  }
  readRunningEvents(): IPersistedEvent[]{
    throw new Error("Method not implemented.");
  }
}




