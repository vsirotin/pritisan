import { Logger } from "../../../../../shared/services/logging/logger";
import { IAlternativeSelectionUIModel, WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { EventTypeSettingUIModel, ITreeSelectorUIModel } from './event-type-setting-ui-model';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel, ICurrentEventChangingNotificator } from './current-event-processing-ui-model';
import { BeginningTypeSettingUIModel} from "./beginning-type-setting-ui-model";


export class CurrentEventProcessingUIFactory {
   


    private static instance: CurrentEventProcessingUIModel | undefined = undefined;
    private static logger: Logger | undefined = undefined;

    static getCurrentEventProcessingUIModel(logger: Logger): ICurrentEventProcessingUIModel {
        if (!CurrentEventProcessingUIFactory.instance) {
            CurrentEventProcessingUIFactory.logger = logger;
            CurrentEventProcessingUIFactory.instance = new CurrentEventProcessingUIModel(logger);
        }
        return CurrentEventProcessingUIFactory.instance;
    }

    // static getCurrentEventChangingNotificator(logger: Logger): ICurrentEventChangingNotificator {
    //     return CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
    // }

    private static workflowTypeSettingUIModel: IAlternativeSelectionUIModel | undefined = undefined;
    static getWorkflowTypeSettingUIModel(logger: Logger): IAlternativeSelectionUIModel {
        if (!CurrentEventProcessingUIFactory.workflowTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
            CurrentEventProcessingUIFactory.workflowTypeSettingUIModel = new WorkflowTypeSettingUIModel(logger, currentEventProcessingUIModel);
        }
        return CurrentEventProcessingUIFactory.workflowTypeSettingUIModel;
    }

    private static eventTypeSettingUIModel: ITreeSelectorUIModel | undefined = undefined;
    static getEventTypeSettingUIModel(logger: Logger): ITreeSelectorUIModel {
        if (!CurrentEventProcessingUIFactory.eventTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
            CurrentEventProcessingUIFactory.eventTypeSettingUIModel = new EventTypeSettingUIModel(logger);
        }
        return CurrentEventProcessingUIFactory.eventTypeSettingUIModel;

    }

    // private static beginningTypeSettingUIModel: IAlternativeSelectionUIModel | undefined = undefined;
    // static getBeginningTypeSettingUIModel(logger: Logger): IAlternativeSelectionUIModel {
    //     if (!CurrentEventProcessingUIFactory.beginningTypeSettingUIModel) {
    //         const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
    //         CurrentEventProcessingUIFactory.beginningTypeSettingUIModel = new BeginningTypeSettingUIModel(logger, currentEventProcessingUIModel);
    //     }
    //     return CurrentEventProcessingUIFactory.beginningTypeSettingUIModel;

    // }

}
