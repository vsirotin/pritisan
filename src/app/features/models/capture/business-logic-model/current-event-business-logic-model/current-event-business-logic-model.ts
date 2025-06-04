
import { ITreeNode, ICaptureBusinessLogicModel, IEvent } from "../../capture-common-interfaces";
import { IEventType, IAlternativeList } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";

export interface ICurrentEventProcessingBusinessLogicModel{
    // getBeginningTypes(): Promise<IAlternativeList>;
    // getEventTypes(): Promise<IAlternativeList>;
    // getActivityTypes(): Promise<ITreeNode[]>;
}

class CurrentEvent implements IEvent {
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEvent");
    private workflowType?: number;
    private eventType?: string;
    setWorkflowType(workflowType: number): void {
      this.workflowType = workflowType;
      this.logger.debug("CurrentEvent.setWorkflowType: " + workflowType);
    }
    setEventType(eventType: string): void {
      this.eventType = eventType;
      this.logger.debug("CurrentEvent.setEventType: " + eventType);
    }
    id: number = 0;
    start: Date = new Date();
    fin: Date | null = null;
    typeId: string = '';
    details: string = '';
}


export class CurrentEventProcessingBusinessLogicModel implements ICurrentEventProcessingBusinessLogicModel{
    
  private static currentEvent: IEvent = new CurrentEvent();

    static saveCurrentEvent() {
      throw new Error('Method not implemented.');
      
    }
    static getCurrentEvent() : IEvent {
      return CurrentEventProcessingBusinessLogicModel.currentEvent;
    }

    private static instance: ICurrentEventProcessingBusinessLogicModel = new CurrentEventProcessingBusinessLogicModel();

    static getInstance(): ICurrentEventProcessingBusinessLogicModel {
        return this.instance;
    }


    private masterDataDB!: IMasterDataPersistence;
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventProcessingBusinessLogicModel");
    
    constructor() {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
        this.masterDataDB = new MasterDataPersistence();
    }
    // async getActivityTypes(): Promise<ITreeNode[]> {
    //     return this.masterDataDB.readActivityTypes();
    // }

    // async getEventTypes(): Promise<IAlternativeList> {
    //     const eventTypes = await this.masterDataDB.readEventTypes();
    //     this.logger.debug("CurrentEventBusinessLogicModel.getEventTypes: " + eventTypes);
    //     return eventTypes;
    // }

    // async getBeginningTypes(): Promise<IAlternativeList> {
    //     const alternatives = await this.masterDataDB.readBeginningTypes();
    //     this.logger.debug("CurrentEventBusinessLogicModel.getBeginningTypes: " + alternatives);
    //     return alternatives;
    // }
}



