import { Logger } from "../../../../../../shared/services/logging/logger";

export class CurrentEventBusinessLogicModel {
    
    constructor(private logger: Logger) {
        this.logger.debug("CurrentEventBusinessLogicModel.constructor");
    }

    async getEventTypes(): Promise<string[]> {
        return ['Beginning of ', 'Ending of ', 'Occurred in the past', 'Spent'];
    }
}

