import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IAlternativeList } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { IWorkflowTypeSelection } from './current-event-processing-ui-model';

export interface IAlternativeSelectionUIModel {
    getAlternatives(): Promise<IAlternativeList>;
    alternativeSelected(selection: IAlternative): void;
}

export class WorkflowTypeSettingUIModel implements IAlternativeSelectionUIModel{

    private alternatives!: IAlternativeList;

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private workflowSelectionReceiver: IWorkflowTypeSelection) {
        this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getAlternatives(): Promise<IAlternativeList> {
        if (this.alternatives !== undefined) {
            this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.alternatives);
            return this.alternatives;         
        }
        return  this.loadFromBusinessLogicModel() ;      
    }


    alternativeSelected(selection: IAlternative) {
        this.logger.debug("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + selection);
        this.workflowSelectionReceiver.workflowTypeSelected(selection); 
    }

    private async loadFromBusinessLogicModel(): Promise<IAlternativeList> {
        await this.businessLogicModel.getEventTypes().then((alternatives) => {
            this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + alternatives);
            this.alternatives = alternatives;
        });
        return this.alternatives;
    }

}

