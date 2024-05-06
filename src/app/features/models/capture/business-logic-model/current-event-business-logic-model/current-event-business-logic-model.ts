import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";
import { Logger } from "../../../../../shared/services/logging/logger";
import { IEventTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";
import { IAlternative } from "./event-commons";

export interface ICurrentEventProcessingBusinessLogicModel{
    getEventTypes(): Promise<IAlternative[]>;
    getActivityTypes(): Promise<IEventTypeNode[]>;
}

//Generic interface for processing alternatives for user selection
export interface IAlternativesProcessingBusinessLogicModel{
    getAlternatives(): Promise<IAlternative[]>;
    getActivityTypes(): Promise<IEventTypeNode[]>;
}

export class CurrentEventProcessingBusinessLogicModel implements ICurrentEventProcessingBusinessLogicModel{

    private masterDataDB!: IMasterDataPersistence;
    
    constructor(private logger: Logger, private parent: ICaptureBusinessLogicModel) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
        this.masterDataDB = new MasterDataPersistence(logger);
    }
    async getActivityTypes(): Promise<IEventTypeNode[]> {
        return this.masterDataDB.readActivityTypes();
    }

    async getEventTypes(): Promise<IAlternative[]> {
        const eventTypes = await this.masterDataDB.readEventTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getEventTypes: " + eventTypes);
        return eventTypes;
    }
}

