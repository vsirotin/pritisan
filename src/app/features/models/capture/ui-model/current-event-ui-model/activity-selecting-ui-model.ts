import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IEventPart } from "../../business-logic-model/current-event-business-logic-model/event-commons";
import { IActivityTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface IActivitySelectingUIModel {
    getActiviyTypes(): Promise<IActivityTypeNode[]>;
    onActivityTypeSelected(node: IActivityTypeNode): void;
}

export class ActivitySelectingUIModel {

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getActiviyTypes(): Promise<IActivityTypeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onActivityTypeSelected(node: IActivityTypeNode) {
      this.logger.debug("ActivitySelectingUIModel.onActivityTypeSelected node: " + node);
      const id =1.1 //TODO
      const message: IEventPart = {stepNumber: 2, name: node.name, id: id, }; 
      this.currentEventNotificationService.notifyCaptureComponent(message); 
    }

}