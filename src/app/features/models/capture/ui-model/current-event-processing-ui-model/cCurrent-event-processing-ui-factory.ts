import { Logger } from "../../../../../shared/services/logging/logger";
import { IWorkflowTypeSettingUIModel, WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { EventTypeSettingUIModel, IEventTypeSettingUIModel } from './event-type-setting-ui-model';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel, ICurrentEventChangingNotificator } from './current-event-processing-ui-model';


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

    static getCurrentEventChangingNotificator(logger: Logger): ICurrentEventChangingNotificator {
        return CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
    }

    private static workflowTypeSettingUIModel: IWorkflowTypeSettingUIModel | undefined = undefined;
    static getWorkflowTypeSettingUIModel(logger: Logger): IWorkflowTypeSettingUIModel {
        if (!CurrentEventProcessingUIFactory.workflowTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
            CurrentEventProcessingUIFactory.workflowTypeSettingUIModel = new WorkflowTypeSettingUIModel(logger, currentEventProcessingUIModel);
        }
        return CurrentEventProcessingUIFactory.workflowTypeSettingUIModel;
    }

    private static eventTypeSettingUIModel: IEventTypeSettingUIModel | undefined = undefined;
    static getEventTypeSettingUIModel(logger: Logger): IEventTypeSettingUIModel {
        if (!CurrentEventProcessingUIFactory.eventTypeSettingUIModel) {
            const currentEventProcessingUIModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel(logger);
            CurrentEventProcessingUIFactory.eventTypeSettingUIModel = new EventTypeSettingUIModel(logger, currentEventProcessingUIModel);
        }
        return CurrentEventProcessingUIFactory.eventTypeSettingUIModel;

    }

}
