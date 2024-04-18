import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventPart, IEventType, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";


export class EventTypeSelectingUIModel {

    private eventTypes!: IEventType[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    updateIndoReceiver!: IReceiverEventPartUpdates;

    constructor(private logger: Logger, private captureNotificationService: CurrentEventNotificationService) {
        this.logger.debug("EventTypeSelectingUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getEventTypes(): Promise<string[]> {
        if (this.eventTypes !== undefined) {
            this.logger.debug("EventTypeSelectingUIModel.getEventTypes 1 eventTypes: " + this.eventTypes);
            return this.eventTypes.map((eventType: IEventType) => eventType.name);         
        }
        return (await this.loadFromBusinessLogicModel()).map((eventType: IEventType) => eventType.name);      
    }

    updateSelectedEventType(eventTypeName: string) {
        this.logger.debug("EventTypeSelectingUIModel.updateSelectedEventType eventTypeName: " + eventTypeName);
        const id = this.eventTypes.find((eventType: IEventType) => eventType.name === eventTypeName)?.id;
        const message: IEventPart = {stepNumber: 1, name: eventTypeName, id: id, }; 
        this.captureNotificationService.notifyCaptureComponent(message); 
    }

    private async loadFromBusinessLogicModel(): Promise<IEventType[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("EventTypeSelectingUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.eventTypes = eventTypes;
        });
        return this.eventTypes;
    }

}
