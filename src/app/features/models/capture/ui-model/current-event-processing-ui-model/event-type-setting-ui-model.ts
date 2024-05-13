import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { ICurrentEventChangingNotificator, IEventChange } from './current-event-processing-ui-model';
import { CurrentEventProcessingUIFactory } from './current-event-processing-ui-factory';
import { ITreeNode, ICaptureBusinessLogicModel } from "../../capture-common-interfaces";

export interface ITreeSelectorUIModel {
    getTreeNodes(): Promise<ITreeNode[]>;
    onTreeNodeSelected(node: ITreeNode): void;
}

export class EventTypeSettingUIModel implements ITreeSelectorUIModel{

  private businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
 
  constructor(
    private logger: Logger, 
    private currentEventNotificationService: ICurrentEventChangingNotificator = CurrentEventProcessingUIFactory.getCurrentEventChangingNotificator(logger)) {
    this.logger.debug("ActivitySelectingUIModel.constructor");
    this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger).getCurrentEventBusinessLogicModel();
  }



    async getTreeNodes(): Promise<ITreeNode[]> {
      return this.businessLogicModel.getActivityTypes();
    }


    onTreeNodeSelected(node: ITreeNode) {
      this.logger.debug("ActivitySelectingUIModel.onActivityTypeSelected node: " + node);
      const message: IEventChange = {localizedName: node.name }; 
      this.currentEventNotificationService.notifyEventChange(message); 
    }

}