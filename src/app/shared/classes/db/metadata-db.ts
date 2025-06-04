import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IRepositoryMetaDataExt } from "../../../features/models/capture/capture-common-interfaces";
import { IPersistedEvent } from "./time-series-db/time-series-db";


export interface IMetaDataPersistence {

  readMetaData(): Promise<IRepositoryMetaDataExt>;

  updateCountEvents(count: number): void;


  updatePageSize(count: number): void;


  updateCurrentEventId(id: number): void;

  readEvent(eventId: number): IPersistedEvent;

}


export class MetaDataPersistence implements IMetaDataPersistence {

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.MetaDataPersistence");

  constructor() {
    this.logger.log("MetaDataPersistence created");
  }

  async readMetaData(): Promise<IRepositoryMetaDataExt> {
    this.logger.warn("MetaDataPersistence.getMetaData. Temporary solution. It should be replaced by real data from DB ");
    return { currentEventPosition: 4, countEvents: 32, pageSize: 10 };
  }


  updateCountEvents(count: number): void {
    this.logger.warn("MetaDataPersistence.updateCountEvents. Temporary solution. It should be replaced by real data from DB ");
  }

  updatePageSize(count: number): void {
    this.logger.warn("MetaDataPersistence.updatePageSize. Temporary solution. It should be replaced by real data from DB ");
  }

  updateCurrentEventId(id: number): void {
    this.logger.warn("MetaDataPersistence.updateCurrentEventId. Temporary solution. It should be replaced by real data from DB ");
  }

  readEvent(eventId: number): IPersistedEvent {
    this.logger.warn("MetaDataPersistence.readEvent. Temporary solution. It should be replaced by real data from DB ");
    return { id: 1, start: new Date(), fin: null, typeId: "1", details: "a" };
  }
}
