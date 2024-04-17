import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureNotificationService } from "../../../../components/capture/capture-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";


export class EventTypeSelectingUIModel {

    private eventTypes!: string[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    updateIndoReceiver!: IReceiverEventPartUpdates;

    constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
        this.logger.debug("EventTypeSelectingUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getEventTypes(): Promise<string[]> {
        if (this.eventTypes !== undefined) {
            this.logger.debug("EventTypeSelectingUIModel.getEventTypes 1 eventTypes: " + this.eventTypes);
            return this.eventTypes;         
        }
        return await this.loadFromBusinessLogicModel();      
    }

    updateSelectedEventType(eventType: string) {
       this.captureNotificationService.notifyCaptureComponent(eventType); 
    }

    private async loadFromBusinessLogicModel(): Promise<string[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("EventTypeSelectingUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.eventTypes = eventTypes;
        });
        return this.eventTypes;
    }

}
