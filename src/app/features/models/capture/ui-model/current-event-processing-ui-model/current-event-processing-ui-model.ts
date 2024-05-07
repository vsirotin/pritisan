import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';
import { Observable, Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../shared/services/logging/logger";
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { IEventTypeSettingUIModel } from './event-type-setting-ui-model';

import { State, Transition, DetermenisticFiniteAutomatation } from '../../../../../shared/classes/finite-automation/finite-automation';

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


//Signals by processing current event
export enum CurrentEventProcessingSignal {
    START_OF_EVENT = "start-of-event",
    NEXT_STEP = "next-step",
    FINISH_OF_EVENT = "finish-of-event",
    OCCURED_IN = "occured-in",
    SPENT = "spent",
    WITH_TIMES = "with-times",
    DAYS_AGO = "days-ago",
    LAST_DAYS = "last-days",
    IN_INTERVAL = "in-interval",
    JUST_NOW = "just-now",
}

type S = CurrentEventProcessingSignal;


//------------Current event ui model -----------------

export interface ICurrentEventProcessingNavigation extends ICurrentEventChangingNotificator{
    navigateTo(action: CurrentEventActions): string; 
    notifyEventChange(eventChange: IEventChange): void;
}

export interface ICurrentEventProcessingUIModel extends ICurrentEventProcessingNavigation {
  doDestroy(): unknown;
  eventDescriptionChange$: Observable<IEventChange>;
  stateChange$: Observable<string>;
}

export class CurrentEventProcessingUIModel implements ICurrentEventProcessingUIModel{

    eventSelectionUIModel!: WorkflowTypeSettingUIModel;
    activityTypeSelectingUIModel!: IEventTypeSettingUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;

    private eventDescriprionSubject = new Subject<IEventChange>();
    eventDescriptionChange$: Observable<IEventChange> = this.eventDescriprionSubject.asObservable();

    private stateChangeSubject = new Subject<string>();
    stateChange$: Observable<string> = this.stateChangeSubject.asObservable();

    private subscriptionCurrentEventNotificationService!: Subscription;
 
    private currentEvent = new CurrentEvent();

    private currentEventProcessingUIAutomation!: CurrentEventProcessingUIAutomation;

  //  private subject = new Subject<IEventChange>();
  //  private eventDescriptionNotification$ = this.subject.asObservable();

    constructor(private logger: Logger) {  

        const p0_workflow_type_setting = new EventProcesingState("workflow-type-selection");
        const p1_event_type_setting = new EventProcesingState("event-type-setting");
        const p2_event_type_setting = new EventProcesingState("event-type-setting");
        const p3_event_type_setting = new EventProcesingState("event-type-setting");
        const p4_beginig_type_setting = new EventProcesingState("beginning-type-setting"); //Begining type for closed event by workflow type 2
        const ressource_type_setting = new EventProcesingState("ressource-type-setting");
        const p5_date_setting = new EventProcesingState("time-point-setting");
        const date_setting2 = new EventProcesingState("time-point-setting");
        const date_setting3 = new EventProcesingState("time-point-setting");
        const date_setting4 = new EventProcesingState("time-point-setting");
        const date_setting5 = new EventProcesingState("time-point-setting");
        const p6_time_interval_setting = new EventProcesingState("time-interval-setting");
        const time_interval_setting2 = new EventProcesingState("time-interval-setting");
        const amount_setting = new EventProcesingState("amount-setting");
        const units_setting = new EventProcesingState("units-setting");
        const number_of_times_setting = new EventProcesingState("number-of-times-setting");
        const comment_setting = new EventProcesingState("comment-setting");
        const tag_setting = new EventProcesingState("tag-setting");
        const interval_type_setting = new EventProcesingState("interval-type-setting");
        const period_type_setting = new EventProcesingState("period-type-setting");
        const event_saving = new EventProcesingState("event-saving");
        const parameters_setting = new EventProcesingState("parameters-setting");



        this.currentEventProcessingUIAutomation = new CurrentEventProcessingUIAutomation(
            this.logger,
            [
                //Workflow type 1
                new TransitionCurrentEventProcessing(p0_workflow_type_setting, p1_event_type_setting),
                new TransitionCurrentEventProcessing(p1_event_type_setting, parameters_setting),
                
                //Workflow type 2
                new TransitionCurrentEventProcessing(p0_workflow_type_setting, p2_event_type_setting, CurrentEventProcessingSignal.FINISH_OF_EVENT),
                new TransitionCurrentEventProcessing(p2_event_type_setting, p4_beginig_type_setting),
                new TransitionCurrentEventProcessing(p4_beginig_type_setting, p5_date_setting),
                new TransitionCurrentEventProcessing(p5_date_setting, parameters_setting),

                new TransitionCurrentEventProcessing(p4_beginig_type_setting, p6_time_interval_setting, CurrentEventProcessingSignal.DAYS_AGO),
                new TransitionCurrentEventProcessing(p6_time_interval_setting, parameters_setting),

                //Workflow type 3
                new TransitionCurrentEventProcessing(p0_workflow_type_setting, p3_event_type_setting, CurrentEventProcessingSignal.OCCURED_IN), 
                new TransitionCurrentEventProcessing(p3_event_type_setting, period_type_setting),
                new TransitionCurrentEventProcessing(period_type_setting, date_setting2, CurrentEventProcessingSignal.LAST_DAYS),
                new TransitionCurrentEventProcessing(date_setting2, number_of_times_setting),
                new TransitionCurrentEventProcessing(number_of_times_setting, parameters_setting),

                new TransitionCurrentEventProcessing(period_type_setting, date_setting3, CurrentEventProcessingSignal.IN_INTERVAL),
                new TransitionCurrentEventProcessing(date_setting3, number_of_times_setting),

                //Workflow type 4
                new TransitionCurrentEventProcessing(p0_workflow_type_setting, interval_type_setting, CurrentEventProcessingSignal.SPENT),
                new TransitionCurrentEventProcessing(interval_type_setting, ressource_type_setting),
                new TransitionCurrentEventProcessing(ressource_type_setting, amount_setting),
                new TransitionCurrentEventProcessing(amount_setting, units_setting),
                new TransitionCurrentEventProcessing(units_setting, parameters_setting),

                new TransitionCurrentEventProcessing(interval_type_setting, time_interval_setting2, CurrentEventProcessingSignal.LAST_DAYS),
                new TransitionCurrentEventProcessing(time_interval_setting2, ressource_type_setting),

                new TransitionCurrentEventProcessing(interval_type_setting, time_interval_setting2, CurrentEventProcessingSignal.LAST_DAYS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ),





                //Common workflow tail
                new TransitionCurrentEventProcessing(parameters_setting, comment_setting),
                new TransitionCurrentEventProcessing(comment_setting, tag_setting),
                new TransitionCurrentEventProcessing(tag_setting, event_saving)

            ], 
            p0_workflow_type_setting,
            this.currentEvent);

    }
    
    

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) { }

    navigateTo(action: CurrentEventActions): string {  
        this.logger.debug('CurrentEventProcessingUIModel navigateTo action: ' + action);

        const signal = CurrentEventProcessingSignal.NEXT_STEP; //TODO: extend to all actions
        this.processSihnalInFA(signal);

        return this.currentEventProcessingUIAutomation.getCurrentState().uiComponentName;
    }

    private processSihnalInFA(signal: CurrentEventProcessingSignal) {
        this.currentEvent = this.currentEventProcessingUIAutomation.processSignal(signal);
        this.logger.debug('CurrentEventProcessingUIModel processSihnalInFA signal: ' + signal
            + ' new currentEvent: ' + JSON.stringify(this.currentEvent)
            + ' new currentState: ' + JSON.stringify(this.currentEventProcessingUIAutomation.getCurrentState()));
    }

    doDestroy() {
        this.subscriptionCurrentEventNotificationService.unsubscribe();
    }



  notifyEventChange(eventChange: IEventChange) {
    this.eventDescriprionSubject.next(eventChange);
      
    this.logger.debug('CurrentEventProcessingUIModel in subscription eventType: ' +  eventChange);
    let signalId = eventChange.signalId; 
    if (signalId === undefined) {
        signalId = CurrentEventProcessingSignal.NEXT_STEP;
    }
    this.processSihnalInFA(signalId as CurrentEventProcessingSignal);
    const newSate = this.currentEventProcessingUIAutomation.getCurrentState().uiComponentName;
    this.stateChangeSubject.next(newSate);
  }
}




class CurrentEvent {
}

class EventProcesingState extends State<CurrentEvent> {

    constructor(public uiComponentName: string) {
        super();
    }
}

class TransitionCurrentEventProcessing extends Transition<CurrentEvent, EventProcesingState, CurrentEventProcessingSignal> {
    constructor(from: EventProcesingState, to: EventProcesingState, signal: CurrentEventProcessingSignal = CurrentEventProcessingSignal.NEXT_STEP) {
        super(from, to, signal);
    }
}

    

class CurrentEventProcessingUIAutomation 
    extends DetermenisticFiniteAutomatation<CurrentEvent, EventProcesingState, CurrentEventProcessingSignal, TransitionCurrentEventProcessing> {

    constructor(
        private logger: Logger,
        transitions: TransitionCurrentEventProcessing[], 
        initialState: EventProcesingState,
        initialSubject: CurrentEvent) {
        super(transitions, initialState, initialSubject);
    }

} 

// Represents information about event change of part of processing event.












