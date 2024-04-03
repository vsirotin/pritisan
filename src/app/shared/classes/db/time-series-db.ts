import { Subject, Observable } from "rxjs";
import { Logger } from "../../services/logging/logger";
import { IRepositoryMetaDataExt } from "../../../features/components/capture/model/capture/capture-common-interfaces";
import { Data } from "@angular/router";

export interface IMetaDataPersistence   {

  readMetaData(): Promise<IRepositoryMetaDataExt>;

  updateCountEvents(count: number): void;


  updatePageSize(count: number): void;


  updateCurrentEventId(id: number): void;

  readEvent(eventId: number): IPersistedEvent;

}


export class MetaDataPersistence implements IMetaDataPersistence{
  
  
  constructor(private logger: Logger){
    this.logger.log("MetaDataPersistence created");
  }

  async readMetaData(): Promise<IRepositoryMetaDataExt>{
    this.logger.warn("MetaDataPersistence.getMetaData. Temporary solution. It should be replaced by real data from DB ");
    return {currentEventPosition: 4, countEvents: 32, pageSize: 10};
  }


  updateCountEvents(count: number): void{
    this.logger.warn("MetaDataPersistence.updateCountEvents. Temporary solution. It should be replaced by real data from DB ");
  } 

  updatePageSize(count: number): void{
    this.logger.warn("MetaDataPersistence.updatePageSize. Temporary solution. It should be replaced by real data from DB ");
  }

  updateCurrentEventId(id: number): void{
    this.logger.warn("MetaDataPersistence.updateCurrentEventId. Temporary solution. It should be replaced by real data from DB ");
  }

  readEvent(eventId: number): IPersistedEvent{
    this.logger.warn("MetaDataPersistence.readEvent. Temporary solution. It should be replaced by real data from DB ");
    return {id: 1, start: new Date(), fin: null, typeId: "1", details: "a"};
  }
}

export interface IPersistedRunningEvents{

  readRunningEvents(): Promise<IPersistedEvent[]>;

}

export class RunningEventsPersistence implements IPersistedRunningEvents{
  constructor(private logger: Logger){
    this.logger.log("RunningEventsPersistence created");
  }

  async readRunningEvents(): Promise<IPersistedEvent[]>{
   
    const TMP_PERSISTED_EVENTS: IPersistedEvent[] = [
      {id: 1, start: new Date(), fin: null, typeId: "1", details: "a"},
      {id: 2, start: new Date(), fin: null, typeId: "2", details: "b"},
      {id: 3, start: new Date(), fin: null, typeId: "3", details: "c"}
    ]
    this.logger.warn("RunningEventsPersistence.readRunningEvents. Temporary solution. It should be replaced by real data from DB. Returning: " 
    + JSON.stringify(TMP_PERSISTED_EVENTS));

    return TMP_PERSISTED_EVENTS;
  }
}

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




