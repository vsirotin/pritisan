
// import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
// import { CaptureBusinessLogicModelFactory } from "../../business-logic-model/capture-business-logic-model";
// import { ICurrentEventProcessingBusinessLogicModel } from "../../business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
// import { IEventType, IAlternativeList } from "../../business-logic-model/current-event-business-logic-model/event-commons";
// import { IWorkflowTypeSelection } from './current-event-processing-ui-model';

// export interface IAlternativeSelectionProcessor {
//     alternativeSelected(selection: IEventType): void;
// }
//TODO: NOT USED
//export class WorkflowTypeSettingUIModel implements IAlternativeSelectionUIModel{

//     private alternatives!: IAlternativeList;

//     businessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
//     private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WorkflowTypeSettingUIModel");  
    
//     constructor(private workflowSelectionReceiver: IWorkflowTypeSelection) {
//         this.logger.debug("WorkflowTypeSelectionUIModel.constructor");
//         this.businessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel().getCurrentEventBusinessLogicModel();
//         this.loadFromBusinessLogicModel();
//     }

//     async getAlternatives(): Promise<IAlternativeList> {
//         if (this.alternatives !== undefined) {
//             this.logger.debug("WorkflowTypeSelectionUIModel.getEventTypes 1 eventTypes: " + this.alternatives);
//             return this.alternatives;         
//         }
//         return  this.loadFromBusinessLogicModel() ;      
//     }


//     alternativeSelected(selection: IEventType) {
//         this.logger.debug("WorkflowTypeSelectionUIModel.changeSelectedWorkflowType workflowTypeName: " + selection);
//         this.workflowSelectionReceiver.workflowTypeSelected(selection); 
//     }

//     private async loadFromBusinessLogicModel(): Promise<IAlternativeList> {
//         await this.businessLogicModel.getEventTypes().then((alternatives) => {
//             this.logger.debug("WorkflowTypeSelectionUIModel.loadFromBusinessLogicModel eventTypes: " + alternatives);
//             this.alternatives = alternatives;
//         });
//         return this.alternatives;
//     }

 //}

