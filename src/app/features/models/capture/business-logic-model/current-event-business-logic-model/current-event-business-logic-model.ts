import { Logger } from "../../../../../shared/services/logging/logger";

export class CurrentEventProcessingBusinessLogicModel {
    
    constructor(private logger: Logger) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
    }

    async getEventTypes(): Promise<string[]> {
        return ['Beginning of ', 'Ending of ', 'Occurred in the past', 'Spent'];
    }
}

