import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventChangeNotificationService } from "./current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventProcessingWorkflowType, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { IEventChange } from "./current-event-notification-service";


export class WorkflowTypeSettingUIModel {

    private workflowTypes!: IEventProcessingWorkflowType[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    updateIndoReceiver!: IReceiverEventPartUpdates;

    constructor(private logger: Logger, private currentEventNotificationService: CurrentEventChangeNotificationService) {
        this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getWorkflowNames(): Promise<string[]> {
        if (this.workflowTypes !== undefined) {
            this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.workflowTypes);
            return this.workflowTypes.map((eventType: IEventProcessingWorkflowType) => eventType.localizedName);         
        }
        return (await this.loadFromBusinessLogicModel()).map((eventType: IEventProcessingWorkflowType) => eventType.localizedName);      
    }

    changeSelectedWorkflowType(workflowTypeName: string) {
        this.logger.debug("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + workflowTypeName);
        const workflowType = this.workflowTypes.find((workflowType: IEventProcessingWorkflowType) => workflowType.localizedName === workflowTypeName);
        if(workflowType === undefined) {
            this.logger.error("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName is unknown");
            return;
        }
        const changingInfo: IEventChange = {signalId: workflowType!.signalId, localizedName:  workflowType!.localizedName }; 
        this.currentEventNotificationService.notifyEventChange(changingInfo); 
    }

    private async loadFromBusinessLogicModel(): Promise<IEventProcessingWorkflowType[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.workflowTypes = eventTypes;
        });
        return this.workflowTypes;
    }

}
