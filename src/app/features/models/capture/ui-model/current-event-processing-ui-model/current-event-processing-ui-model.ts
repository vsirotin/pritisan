import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';
import { Observable, Subject, Subscription } from "rxjs";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { ITreeSelectorUIModel } from './event-type-setting-ui-model';

import { State, Transition, DetermenisticFiniteAutomatation } from '../../../../../shared/classes/finite-automation/finite-automation';
import { IAlternative } from '../../business-logic-model/current-event-business-logic-model/event-commons';

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

interface ICurrentEventProcessingNavigation {
    navigateTo(action: CurrentEventActions): string; 
}

export interface IWorkflowTypeSelection {
    workflowTypeSelected(selection: IAlternative): void;
}

export interface ICurrentEventProcessingUIModel extends ICurrentEventProcessingNavigation, IWorkflowTypeSelection {
  doDestroy(): unknown;
  eventDescriptionChange$: Observable<IEventChange>;
  stateChange$: Observable<string>;
}

export class CurrentEventProcessingUIModel implements ICurrentEventProcessingUIModel{

    eventSelectionUIModel!: WorkflowTypeSettingUIModel;
    activityTypeSelectingUIModel!: ITreeSelectorUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;

    private eventDescriprionSubject = new Subject<IEventChange>();
    eventDescriptionChange$: Observable<IEventChange> = this.eventDescriprionSubject.asObservable();

    private stateChangeSubject = new Subject<string>();
    stateChange$: Observable<string> = this.stateChangeSubject.asObservable();
 
    private currentEvent = new CurrentEvent();
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventProcessingUIModel"); 
    constructor() { }
    workflowTypeSelected(selection: IAlternative): void {

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
    
    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) { }

    navigateTo(action: CurrentEventActions): string {  
        this.logger.debug('CurrentEventProcessingUIModel navigateTo action: ' + action);
        return "workflow-event-processing";
    }

    doDestroy() {

    }
}

class CurrentEvent {
}
















