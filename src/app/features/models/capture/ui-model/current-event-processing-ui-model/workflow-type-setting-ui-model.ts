import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';

export interface IAlternativeSelectionUIModel {
    getAlternatives(): Promise<IAlternative[]>;
    alternativeSelected(selection: IAlternative): void;
}

export class WorkflowTypeSettingUIModel implements IAlternativeSelectionUIModel{

    private alternatives!: IAlternative[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private currentEventNotificationService: ICurrentEventChangingNotificator) {
        this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getAlternatives(): Promise<IAlternative[]> {
        if (this.alternatives !== undefined) {
            this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.alternatives);
            return this.alternatives;         
        }
        return  this.loadFromBusinessLogicModel() ;      
    }


    alternativeSelected(selection: IAlternative) {
        this.logger.debug("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + selection);
        //const workflowType = this.workflowTypes.find((workflowType: IAlternative) => this.evntType2workflowName(workflowType) === workflowTypeName);
        if(selection === undefined) {
            this.logger.error("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName is unknown");
            return;
        }
        const changingInfo: IEventChange = {signalId: "" + selection.id, localizedName:  selection.name }; 
        this.currentEventNotificationService.notifyEventChange(changingInfo); 
    }

    private async loadFromBusinessLogicModel(): Promise<IAlternative[]> {
        await this.businessLogicModel.getEventTypes().then((eventTypes) => {
            this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + eventTypes);
            this.alternatives = eventTypes;
        });
        return this.alternatives;
    }

}

