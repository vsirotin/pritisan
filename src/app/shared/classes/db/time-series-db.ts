import { Subject, Observable } from "rxjs";
import { Logger } from "../../services/logging/logger";
import { Data } from "@angular/router";

export interface IPersistedEvent{
  id: number
  start: Data;
  fin: Data|null;
  typeId: string;
  details: string|null;
}

export interface IEventsPersistence {
  saveEvent(event: IPersistedEvent): number;
  updateEvents(events: IPersistedEvent[]): void;
  deleteEvents(eventIds: number[]): void;
  readRunningEvents(): IPersistedEvent[];
}

export class EventsPersistence implements IEventsPersistence{
  constructor(private logger: Logger){
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




