import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";
import { Logger } from "../../../../../shared/services/logging/logger";
import { ITreeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";
import { IAlternative } from "./event-commons";

export interface ICurrentEventProcessingBusinessLogicModel{
    getBeginningTypes(): Promise<IAlternative[]>;
    getEventTypes(): Promise<IAlternative[]>;
    getActivityTypes(): Promise<ITreeNode[]>;
}

export class CurrentEventProcessingBusinessLogicModel implements ICurrentEventProcessingBusinessLogicModel{

    private masterDataDB!: IMasterDataPersistence;
    
    constructor(private logger: Logger, private parent: ICaptureBusinessLogicModel) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
        this.masterDataDB = new MasterDataPersistence(logger);
    }
    async getActivityTypes(): Promise<ITreeNode[]> {
        return this.masterDataDB.readActivityTypes();
    }

    async getEventTypes(): Promise<IAlternative[]> {
        const eventTypes = await this.masterDataDB.readEventTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getEventTypes: " + eventTypes);
        return eventTypes;
    }

    async getBeginningTypes(): Promise<IAlternative[]> {
        const alternatives = await this.masterDataDB.readBeginningTypes();
        this.logger.debug("CurrentEventBusinessLogicModel.getBeginningTypes: " + alternatives);
        return alternatives;
    }
}

