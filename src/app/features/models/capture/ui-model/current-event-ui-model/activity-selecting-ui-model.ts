import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureNotificationService } from "../../../../components/capture/capture-notification-service";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IActivityTypeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface IActivitySelectingUIModel {
    getActiviyTypes(): Promise<IActivityTypeNode[]>;
    onNodeClick(node: IActivityTypeNode): void;
}

export class ActivitySelectingUIModel {

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getActiviyTypes(): Promise<IActivityTypeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onNodeClick(node: IActivityTypeNode) {
        throw new Error('Method not implemented.');
    }

}