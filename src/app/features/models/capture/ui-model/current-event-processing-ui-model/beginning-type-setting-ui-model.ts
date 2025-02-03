import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IAlternativeList, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';
import { IAlternativeSelectionUIModel } from "./workflow-type-setting-ui-model";



export class BeginningTypeSettingUIModel implements IAlternativeSelectionUIModel{

    private beginningType!: IAlternativeList;

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private currentEventNotificationService: ICurrentEventChangingNotificator) {
        this.logger.debug("BeginningTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getAlternatives(): Promise<IAlternativeList> {
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

    private async loadFromBusinessLogicModel(): Promise<IAlternativeList> {
        await this.businessLogicModel.getBeginningTypes().then((alternativeList) => {
            this.logger.debug("BeginningTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + alternativeList);
            this.beginningType = alternativeList;
        });
        return this.beginningType;
    }

}

export { IAlternativeSelectionUIModel };

