import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';
import { Observable, Subject, Subscription } from "rxjs";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
//import { ITreeSelectorUIModel } from './event-type-setting-ui-model';
import { IEventType } from '../../business-logic-model/current-event-business-logic-model/event-commons';

export interface IEventChange {
    //represent Id of signal in finity automation to process this changing
    signalId?: string;

    //represent name of event changing process or event 
    localizedName: string;
}

export interface ICurrentEventChangingNotificator {
    notifyEventChange(eventChange: IEventChange): void;
}

//Actions by processing current event
export enum CurrentEventActions {
    NEXT_STEP,
    SAVE,
    CANCEL,
    DELETE
}



//------------Current event ui model -----------------

// interface ICurrentEventProcessingNavigation {
//     navigateTo(action: CurrentEventActions): string; 
// }

export interface  ICurrentEvent{
  setEventType(eventTypeId: string): unknown;
  setWorkflowType(workflowTypeId: number): void;
}


export interface IWorkflowTypeSelection {
    workflowTypeSelected(selection: IEventType): void;
}

export interface ICurrentEventProcessingUIModel extends  IWorkflowTypeSelection {
    getCurrentEvent(): ICurrentEvent;
    saveCurrentEvent(): void
    eventDescriptionChange$: Observable<IEventChange>;
    stateChange$: Observable<string>;
}

class CurrentEvent implements ICurrentEvent {

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEvent"); 

    workflowTypeId : number = 0;
    eventTypeId: string = "";
    

    setWorkflowType(workflowTypeId: number): void {
        this.logger.debug('setWorkflowType id: ' + workflowTypeId);
        this.workflowTypeId = workflowTypeId;
    }

    setEventType(eventTypeId: string): void {
        this.logger.debug('setEventType id: ' + eventTypeId);
        this.eventTypeId = eventTypeId;
    }
}


export class CurrentEventProcessingUIModel implements ICurrentEventProcessingUIModel{


   

    private static instance:  ICurrentEventProcessingUIModel = new CurrentEventProcessingUIModel();

    static getInstance(): ICurrentEventProcessingUIModel {
        return this.instance;
    }

    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;

    private eventDescriprionSubject = new Subject<IEventChange>();
    eventDescriptionChange$: Observable<IEventChange> = this.eventDescriprionSubject.asObservable();

    private stateChangeSubject = new Subject<string>();
    stateChange$: Observable<string> = this.stateChangeSubject.asObservable();
 

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventProcessingUIModel"); 

    private currentEvent: ICurrentEvent = new CurrentEvent();

    getCurrentEvent(): ICurrentEvent {
        return this.currentEvent;
    }

    workflowTypeSelected(selection: IEventType): void {

        let newState = "workflow-event-processing";
        switch (selection.id) {
            case 2:
                newState = "workflow-ressource-processing";
                break;
            case 3:
                newState = "workflow-observation-processing";
                break;    

        }
        this.stateChangeSubject.next(newState); 
    }
    

    navigateTo(action: CurrentEventActions): string {  
        this.logger.debug('CurrentEventProcessingUIModel navigateTo action: ' + action);
        return "workflow-event-processing";
    }

    saveCurrentEvent(): void {
        this.logger.error('NOT IMPLEMENTED saveCurrentEvent currentEvent: ' + JSON.stringify(this.currentEvent));
    }


}
















