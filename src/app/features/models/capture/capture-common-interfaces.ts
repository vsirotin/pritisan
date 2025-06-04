import { Data } from "@angular/router";
import { ICurrentEventProcessingBusinessLogicModel } from "./business-logic-model/current-event-business-logic-model/current-event-business-logic-model";
import { IRepositoryBusinessLogicModel } from "./business-logic-model/repository-navigation-business-logic-model";
import { IRunningEventsBusinessLogicModel } from "./business-logic-model/running-events-business-logic-model";

export interface IRepositoryMetaData {
    currentEventPosition: number;
    countEvents: number;
}


export interface IRepositoryMetaDataExt extends IRepositoryMetaData{
    pageSize: number;
}

export interface IEvent {
    setWorkflowType(workflowType: number): void;
    setEventType(eventType: string): void;
    id: number
    start: Data;
    fin: Data|null;
    typeId: string;
    details: string|null;

} //------------Current event behavior model----------------
export interface ICaptureBusinessLogicModel {
    getRepositoryBusinessLogicModel(): IRepositoryBusinessLogicModel;
    getRunningEventsBusinessLogicModel(): IRunningEventsBusinessLogicModel;
    getCurrentEventBusinessLogicModel(): ICurrentEventProcessingBusinessLogicModel;
}

export interface ITreeNode {
  name: string;
  children?: ITreeNode[];
  id: number;
}

