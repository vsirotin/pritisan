import { IMasterDataPersistence, MasterDataPersistence } from "../../../../../shared/classes/db/masterdata-db";
import { Logger } from "../../../../../shared/services/logging/logger";
import { ITreeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";
import { IAlternative, IAlternativeList } from "../../business-logic-model/current-event-business-logic-model/event-commons";

export interface ICurrentEventProcessingBusinessLogicModel{
    getBeginningTypes(): Promise<IAlternativeList>;
    getEventTypes(): Promise<IAlternativeList>;
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

