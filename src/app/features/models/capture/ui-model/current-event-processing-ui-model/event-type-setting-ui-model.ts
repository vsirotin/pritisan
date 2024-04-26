import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventChangeNotificationService } from "./current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventChange } from './current-event-processing-ui-model';
import { IEventTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface IEventTypeSettingUIModel {
    getEventTypes(): Promise<IEventTypeNode[]>;
    onEventTypeSelected(node: IEventTypeNode): void;
}

export class EventTypeSettingUIModel implements IEventTypeSettingUIModel{

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(
    private logger: Logger, 
    private currentEventNotificationService: CurrentEventChangeNotificationService) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getEventTypes(): Promise<IEventTypeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onEventTypeSelected(node: IEventTypeNode) {
      this.logger.debug("ActivitySelectingUIModel.onActivityTypeSelected node: " + node);
      const message: IEventChange = {localizedName: node.name, signalId: "no_set" }; 
      this.currentEventNotificationService.notifyEventChange(message); 
    }

}