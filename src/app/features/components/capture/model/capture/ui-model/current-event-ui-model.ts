import { Logger } from "../../../../../../shared/services/logging/logger";
import { CurrentEventBusinessLogicModel } from "../business-logic-model/current-event-business-logic-model";

export class EventTypeSelectingUIModel {

    private selectedEventType!: string;
    private eventTypes!: string[];

    businessLogicModel!: CurrentEventBusinessLogicModel;

    constructor(private logger: Logger) {
        this.logger.debug("EventTypeSelectingUIModel.constructor");
        this.businessLogicModel = new CurrentEventBusinessLogicModel(this.logger);
        this.loadFromBusinessLogicModel();
    }

    async getEventTypes(): Promise<string[]> {
        if(this.eventTypes !== undefined) {
            return this.eventTypes;
        }
        await this.loadFromBusinessLogicModel();
        return this.eventTypes;
    }

    updateSelectedEventType(eventType: string) {
        this.eventTypes.indexOf(eventType);
    }

    private async loadFromBusinessLogicModel() {
        this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("EventTypeSelectingUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.eventTypes = eventTypes;
            this.selectedEventType = this.eventTypes[0];
        });
    }
        
}
