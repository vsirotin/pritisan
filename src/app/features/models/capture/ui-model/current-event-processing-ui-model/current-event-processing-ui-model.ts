import { Observable } from "rxjs";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IEventType } from "../../../../capture/commons/event-commons";

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




export interface IWorkflowTypeSelection {
    workflowTypeSelected(selection: IEventType): void;
}

export interface ICurrentEventProcessingUIModel extends  IWorkflowTypeSelection {
//     getCurrentEvent(): IClosedEvent;
//     saveCurrentEvent(): void
//     eventDescriptionChange$: Observable<IEventChange>;
    stateChange$: Observable<string>;
 }



//TODO NOT USED
export class CurrentEventProcessingUIModel { //implements ICurrentEventProcessingUIModel{


  //  private static instance:  ICurrentEventProcessingUIModel = new CurrentEventProcessingUIModel();

    // static getInstance(): ICurrentEventProcessingUIModel {
    //     return this.instance;
    // }

    // timeSettingUIModel!: TimeSettingUIModel;
    //parametersSettingUIModel!: ParametersSettingUIModel;

    // private eventDescriprionSubject = new Subject<IEventChange>();
    // eventDescriptionChange$: Observable<IEventChange> = this.eventDescriprionSubject.asObservable();

    // private stateChangeSubject = new Subject<string>();
    // stateChange$: Observable<string> = this.stateChangeSubject.asObservable();
 

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventProcessingUIModel"); 

    // private currentEvent: IClosedEvent = new CurrentEvent();

    // getCurrentEvent(): IClosedEvent {
    //     return this.currentEvent;
    // }

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
//       this.stateChangeSubject.next(newState); 
    }
    

    navigateTo(action: CurrentEventActions): string {  
        this.logger.debug('CurrentEventProcessingUIModel navigateTo action: ' + action);
        return "workflow-event-processing";
    }

    // saveCurrentEvent(): void {
    //     this.logger.error('NOT IMPLEMENTED saveCurrentEvent currentEvent: ' + JSON.stringify(this.currentEvent));
    // }


}
















