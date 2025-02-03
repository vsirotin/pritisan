import { IAlternativeSelectionUIModel, WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { EventTypeSettingUIModel, ITreeSelectorUIModel } from './event-type-setting-ui-model';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel, ICurrentEventChangingNotificator } from './current-event-processing-ui-model';


export class CurrentEventProcessingUIFactory {
   


    private static instance: CurrentEventProcessingUIModel | undefined = undefined;

    static getCurrentEventProcessingUIModel(): ICurrentEventProcessingUIModel {
        if (!CurrentEventProcessingUIFactory.instance) {
            CurrentEventProcessingUIFactory.instance = new CurrentEventProcessingUIModel();
        }
        return CurrentEventProcessingUIFactory.instance;
    }


    private static workflowTypeSettingUIModel: IAlternativeSelectionUIModel | undefined = undefined;
    static getWorkflowTypeSettingUIModel(): IAlternativeSelectionUIModel {
        if (!CurrentEventProcessingUIFactory.workflowTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel();
            CurrentEventProcessingUIFactory.workflowTypeSettingUIModel = new WorkflowTypeSettingUIModel(currentEventProcessingUIModel);
        }
        return CurrentEventProcessingUIFactory.workflowTypeSettingUIModel;
    }

    private static eventTypeSettingUIModel: ITreeSelectorUIModel | undefined = undefined;
    static getEventTypeSettingUIModel(): ITreeSelectorUIModel {
        if (!CurrentEventProcessingUIFactory.eventTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel();
            CurrentEventProcessingUIFactory.eventTypeSettingUIModel = new EventTypeSettingUIModel();
        }
        return CurrentEventProcessingUIFactory.eventTypeSettingUIModel;

    }

}
