import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventPart } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { IEventTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface IEventTypeSettingUIModel {
    getEventTypes(): Promise<IEventTypeNode[]>;
    onEventTypeSelected(node: IEventTypeNode): void;
}

export class EventTypeSettingUIModel implements IEventTypeSettingUIModel{

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getEventTypes(): Promise<IEventTypeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onEventTypeSelected(node: IEventTypeNode) {
      this.logger.debug("ActivitySelectingUIModel.onActivityTypeSelected node: " + node);
      const id =1.1 //TODO
      const message: IEventPart = {localizedName: node.name, id: "no_set" }; 
      this.currentEventNotificationService.notifyAboutUserAction(message); 
    }

}