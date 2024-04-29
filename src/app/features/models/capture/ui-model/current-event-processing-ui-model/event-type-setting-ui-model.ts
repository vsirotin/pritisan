import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';
import { CurrentEventProcessingUIFactory } from './cCurrent-event-processing-ui-factory';
import { IEventTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface IEventTypeSettingUIModel {
    getEventTypes(): Promise<IEventTypeNode[]>;
    onEventTypeSelected(node: IEventTypeNode): void;
}

export class EventTypeSettingUIModel implements IEventTypeSettingUIModel{

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(
    private logger: Logger, 
    private currentEventNotificationService: ICurrentEventChangingNotificator = CurrentEventProcessingUIFactory.getCurrentEventChangingNotificator(logger)) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getEventTypes(): Promise<IEventTypeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onEventTypeSelected(node: IEventTypeNode) {
      this.logger.debug("ActivitySelectingUIModel.onActivityTypeSelected node: " + node);
      const message: IEventChange = {localizedName: node.name }; 
      this.currentEventNotificationService.notifyEventChange(message); 
    }

}