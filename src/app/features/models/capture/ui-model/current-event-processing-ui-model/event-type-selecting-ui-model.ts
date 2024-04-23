import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventPart, IEventType, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";


export class WorkflowTypeSelectionUIModel {

    private eventTypes!: IEventType[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    updateIndoReceiver!: IReceiverEventPartUpdates;

    constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) {
        this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getEventTypes(): Promise<string[]> {
        if (this.eventTypes !== undefined) {
            this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.eventTypes);
            return this.eventTypes.map((eventType: IEventType) => eventType.localizedName);         
        }
        return (await this.loadFromBusinessLogicModel()).map((eventType: IEventType) => eventType.localizedName);      
    }

    updateSelectedEventType(eventTypeName: string) {
        this.logger.debug("WorkflowTypeSelectionUIModel.updateSelectedEventType eventTypeName: " + eventTypeName);
        const eventType = this.eventTypes.find((eventType: IEventType) => eventType.localizedName === eventTypeName);
        if(eventType === undefined) {
            this.logger.error("WorkflowTypeSelectionUIModel.updateSelectedEventType eventType is undefined");
            return;
        }
        const message: IEventPart = {id: eventType!.id, localizedName:  eventType!.localizedName }; 
        this.currentEventNotificationService.notifyAboutUserAction(message); 
    }

    private async loadFromBusinessLogicModel(): Promise<IEventType[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.eventTypes = eventTypes;
        });
        return this.eventTypes;
    }

}
