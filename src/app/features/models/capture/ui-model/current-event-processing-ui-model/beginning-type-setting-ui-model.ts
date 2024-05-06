import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IAlternative, IReceiverEventPartUpdates } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';

export interface IBeginningTypeSettingUIModel {
    getAlternativeNames(): Promise<string[]>;
    changeSelectedAlternative(alternative: string): void;
}

export class BeginningTypeSettingUIModel implements IBeginningTypeSettingUIModel{

    private beginningType!: IAlternative[];

    businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;

    constructor(private logger: Logger, private currentEventNotificationService: ICurrentEventChangingNotificator) {
        this.logger.debug("BeginningTypeSelectionUIModel.constructor");
        this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
        this.loadFromBusinessLogicModel();
    }

    async getAlternativeNames(): Promise<string[]> {
        if (this.beginningType !== undefined) {
            this.logger.debug("BeginningTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.beginningType);
            return this.beginningType.map((eventType: IAlternative) => this.evntType2AlternativeName(eventType));         
        }
        return (await this.loadFromBusinessLogicModel()).map((eventType: IAlternative) => this.evntType2AlternativeName(eventType)) ;      
    }

    private evntType2AlternativeName(eventType: IAlternative): string {
        return eventType.localizedName + " " + eventType.suffix;
    }

    changeSelectedAlternative(workflowTypeName: string) {
        this.logger.debug("BeginningTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + workflowTypeName);
        const workflowType = this.beginningType.find((workflowType: IAlternative) => this.evntType2AlternativeName(workflowType) === workflowTypeName);
        if(workflowType === undefined) {
            this.logger.error("BeginningTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName is unknown");
            return;
        }
        const changingInfo: IEventChange = {signalId: workflowType!.signalId, localizedName:  workflowType!.localizedName }; 
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

