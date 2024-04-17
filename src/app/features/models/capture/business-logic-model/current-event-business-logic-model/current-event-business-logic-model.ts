import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";
import { Logger } from "../../../../../shared/services/logging/logger";
import { IActivityTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface ICurrentEventProcessingBusinessLogicModel{
    getEventTypes(): Promise<string[]>;
    getActivityTypes(): Promise<IActivityTypeNode[]>;
}

export class CurrentEventProcessingBusinessLogicModel implements ICurrentEventProcessingBusinessLogicModel{

    private masterDataDB!: IMasterDataPersistence;
    
    constructor(private logger: Logger, private parent: ICaptureBusinessLogicModel) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
        this.masterDataDB = new MasterDataPersistence(logger);
    }
    async getActivityTypes(): Promise<IActivityTypeNode[]> {
        return this.masterDataDB.readActivityTypes();
    }

    async getEventTypes(): Promise<string[]> {
        const eventTypes = await this.masterDataDB.readEventTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getEventTypes: " + eventTypes);
        return eventTypes;
    }
}

