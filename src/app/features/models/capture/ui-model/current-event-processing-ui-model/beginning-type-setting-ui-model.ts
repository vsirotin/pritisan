import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';
import { IAlternativeSelectionUIModel } from "./workflow-type-setting-ui-model";



export class BeginningTypeSettingUIModel implements IAlternativeSelectionUIModel{

    private beginningType!: IAlternative[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private currentEventNotificationService: ICurrentEventChangingNotificator) {
        this.logger.debug("BeginningTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getAlternatives(): Promise<IAlternative[]> {
        if (this.beginningType !== undefined) {
            this.logger.debug("BeginningTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.beginningType);
            return this.beginningType;         
        }
        return await this.loadFromBusinessLogicModel() ;      
    }


    alternativeSelected(workflowTypeName: IAlternative) {
        this.logger.debug("BeginningTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + workflowTypeName);
        
        if(workflowTypeName === undefined) {
            this.logger.error("BeginningTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName is unknown");
            return;
        }
        const changingInfo: IEventChange = {signalId: "" + workflowTypeName.id, localizedName:  workflowTypeName.name }; 
        this.currentEventNotificationService.notifyEventChange(changingInfo); 
    }

    private async loadFromBusinessLogicModel(): Promise<IAlternative[]> {
        await this.businessLogicModel.getBeginningTypes().then((alternatives) => {
            this.logger.debug("BeginningTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + alternatives);
            this.beginningType = alternatives;
        });
        return this.beginningType;
    }

}

export { IAlternativeSelectionUIModel };

