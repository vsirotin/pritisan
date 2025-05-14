
import { ITreeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";
import { IEventType, IAlternativeList } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";

export interface ICurrentEventProcessingBusinessLogicModel{
    getBeginningTypes(): Promise<IAlternativeList>;
    getEventTypes(): Promise<IAlternativeList>;
    getActivityTypes(): Promise<ITreeNode[]>;
}

export class CurrentEventProcessingBusinessLogicModel implements ICurrentEventProcessingBusinessLogicModel{

    private masterDataDB!: IMasterDataPersistence;
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventProcessingBusinessLogicModel");
    
    constructor(private parent: ICaptureBusinessLogicModel) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
        this.masterDataDB = new MasterDataPersistence();
    }
    async getActivityTypes(): Promise<ITreeNode[]> {
        return this.masterDataDB.readActivityTypes();
    }

    async getEventTypes(): Promise<IAlternativeList> {
        const eventTypes = await this.masterDataDB.readEventTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getEventTypes: " + eventTypes);
        return eventTypes;
    }

    async getBeginningTypes(): Promise<IAlternativeList> {
        const alternatives = await this.masterDataDB.readBeginningTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getBeginningTypes: " + alternatives);
        return alternatives;
    }
}

