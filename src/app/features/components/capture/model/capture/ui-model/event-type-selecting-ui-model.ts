import { Logger } from "../../../../../../shared/services/logging/logger";
import { CurrentEventBusinessLogicModel } from "../business-logic-model/current-event-business-logic-model";
import { IReceiverEventPartUpdates } from "../business-logic-model/event-commons";


export class EventTypeSelectingUIModel {


    private eventTypes!: string[];

    businessLogicModel!: CurrentEventBusinessLogicModel;

    updateIndoReceiver!: IReceiverEventPartUpdates;

    constructor(private logger: Logger) {
        this.logger.debug("EventTypeSelectingUIModel.constructor");
        this.businessLogicModel = new CurrentEventBusinessLogicModel(this.logger);
        this.loadFromBusinessLogicModel();
    }

    async getEventTypes(): Promise<string[]> {
        if (this.eventTypes !== undefined) {
            return this.eventTypes;
        }
        await this.loadFromBusinessLogicModel();
        return this.eventTypes;
    }

    updateSelectedEventType(eventType: string) {
        if (this.updateIndoReceiver !== undefined) {
            this.updateIndoReceiver.addEventPart({
                partAsText: "EventType: " + eventType
            });
        }
    }

    private async loadFromBusinessLogicModel() {
        this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("EventTypeSelectingUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.eventTypes = eventTypes;
        });
    }

}
