import { Subject, Observable } from "rxjs";
import { Logger } from "../../services/logging/logger";
import { IRepositoryMetaData } from "../../../features/components/capture/model/capture/business-logic-model/repository-navigation-business-logic-model";

export interface IMetaDataPersistence   {

  readMetaData(): IRepositoryMetaData

  updateCountEvents(count: number): void;


  updatePageSize(count: number): void;


  updateCurrentEventId(id: number): void;

  readEvent(eventId: number): IPersistedEvent;

}


export class MetaDataPersistence implements IMetaDataPersistence{
  
  
  constructor(private logger: Logger){
    this.logger.log("MetaDataPersistence created");
  }

  readMetaData(): IRepositoryMetaData{
    this.logger.warn("MetaDataPersistence.getMetaData. Temporary solution. It should be replaced by real data from DB ");
    return {currentEventPosition: 3, countEvents: 31, pageSize: 10};
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
    return {};
  }
}

export interface IPersistedEvent{}

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




