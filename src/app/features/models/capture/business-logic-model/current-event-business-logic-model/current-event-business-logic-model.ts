import { Logger } from "../../../../../shared/services/logging/logger";
import { ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface ICurrentEventProcessingBusinessLogicModel{
    getEventTypes(): Promise<string[]>;
}

export class CurrentEventProcessingBusinessLogicModel {
    
    constructor(private logger: Logger, private parent: ICaptureBusinessLogicModel) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
    }

    async getEventTypes(): Promise<string[]> {
        return ['Beginning of ', 'Ending of ', 'Occurred in the past', 'Spent'];
    }
}

