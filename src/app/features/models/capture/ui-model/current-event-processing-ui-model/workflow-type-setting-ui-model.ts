import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';

export interface IWorkflowTypeSettingUIModel {
    getWorkflowNames(): Promise<string[]>;
    changeSelectedWorkflowType(workflowTypeName: string): void;
}

export class WorkflowTypeSettingUIModel implements IWorkflowTypeSettingUIModel{

    private workflowTypes!: IAlternative[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private currentEventNotificationService: ICurrentEventChangingNotificator) {
        this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getWorkflowNames(): Promise<string[]> {
        if (this.workflowTypes !== undefined) {
            this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.workflowTypes);
            return this.workflowTypes.map((eventType: IAlternative) => this.evntType2workflowName(eventType));         
        }
        return (await this.loadFromBusinessLogicModel()).map((eventType: IAlternative) => this.evntType2workflowName(eventType)) ;      
    }

    private evntType2workflowName(eventType: IAlternative): string {
        return eventType.localizedName + " " + eventType.suffix;
    }

    changeSelectedWorkflowType(workflowTypeName: string) {
        this.logger.debug("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + workflowTypeName);
        const workflowType = this.workflowTypes.find((workflowType: IAlternative) => this.evntType2workflowName(workflowType) === workflowTypeName);
        if(workflowType === undefined) {
            this.logger.error("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName is unknown");
            return;
        }
        const changingInfo: IEventChange = {signalId: workflowType!.signalId, localizedName:  workflowType!.localizedName }; 
        this.currentEventNotificationService.notifyEventChange(changingInfo); 
    }

    private async loadFromBusinessLogicModel(): Promise<IAlternative[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.workflowTypes = eventTypes;
        });
        return this.workflowTypes;
    }

}

