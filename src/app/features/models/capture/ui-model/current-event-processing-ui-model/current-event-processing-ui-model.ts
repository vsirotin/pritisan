import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';

import { Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { WorkflowTypeSelectionUIModel } from "./event-type-selecting-ui-model";
import { IActivitySelectingUIModel } from './activity-selecting-ui-model';
import { IEventPart } from '../../business-logic-model/current-event-business-logic-model/event-commons';

//Actions by processing current event
export enum CurrentEventActions {
    FIRST_STEP,
    PREVIOUS_STEP,
    NEXT_STEP,
    SAVE,
    CANCEL,
    DELETE
}

//States by processing current event
export enum CurrentEventState {
    WORKFLOW_TYPE_SETTING = "workflow-type-setting",
    EVENT_TYPE_SETTING = "event-type-setting",
    RESSOURCE_TYPE_SETTING = "ressource-type-setting",
    DATE_SETTING = "date-setting",
    TIME_INTERVAL_SETTING = "time-interval-setting",
    AMOUNT_SETTING = "amount-setting",
    UNITS_SETTING = "units-setting",
    NUMBER_OF_TIMES_SETTING = "number-of-times-setting",
    COMMENT_SETTING = "comment-setting",
    TAG_SETTING = "tag-setting",
    INTERVAL_TYPE_SETTING = "interval-type-setting",
    BEGINNING_TYPE_SETTING = "beginning-type-setting",
    PERIOD_TYPE_SETTING = "period-type-setting"
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

export interface ICurrentEventProcessingUIModel {
  navigateTo(action: CurrentEventActions): string;
  doDestroy(): unknown;

}

export class CurrentEventProcessingUIModel {



    eventSelectionUIModel!: WorkflowTypeSelectionUIModel;
    activityTypeSelectingUIModel!: IActivitySelectingUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;

    private eventDescriprionSubject = new Subject<IEventPart>();

    eventDescriptionChange$ = this.eventDescriprionSubject.asObservable();

    private subscriptionCurrentEventNotificationService!: Subscription;
 
    private currentEvent = new CurrentEvent();

    private currentEventProcessingUIAutomation!: CurrentEventProcessingUIAutomation;

    constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) {  

        const workflow_type_setting = new EventProcesingState(CurrentEventState.WORKFLOW_TYPE_SETTING);
        const event_type_setting = new EventProcesingState(CurrentEventState.EVENT_TYPE_SETTING);
        const ressource_type_setting = new EventProcesingState(CurrentEventState.RESSOURCE_TYPE_SETTING);
        const date_setting = new EventProcesingState(CurrentEventState.DATE_SETTING);
        const time_interval_setting = new EventProcesingState(CurrentEventState.TIME_INTERVAL_SETTING);
        const amount_setting = new EventProcesingState(CurrentEventState.AMOUNT_SETTING);
        const units_setting = new EventProcesingState(CurrentEventState.UNITS_SETTING);
        const number_of_times_setting = new EventProcesingState(CurrentEventState.NUMBER_OF_TIMES_SETTING);
        const comment_setting = new EventProcesingState(CurrentEventState.COMMENT_SETTING);
        const tag_setting = new EventProcesingState(CurrentEventState.TAG_SETTING);
        const interval_type_setting = new EventProcesingState(CurrentEventState.INTERVAL_TYPE_SETTING);
        const beginning_type_setting = new EventProcesingState(CurrentEventState.BEGINNING_TYPE_SETTING);
        const period_type_setting = new EventProcesingState(CurrentEventState.PERIOD_TYPE_SETTING);


   
        const currentEventProcessingUIAutomationExecutor = new CurrentEventProcessingUIAutomationExecutor();
        this.currentEventProcessingUIAutomation = new CurrentEventProcessingUIAutomation(
            this.logger,
            [
                workflow_type_setting,
                event_type_setting,
                ressource_type_setting,
                date_setting,
                time_interval_setting,
                amount_setting,
                units_setting,
                number_of_times_setting,
                comment_setting,
                tag_setting,
                interval_type_setting,
                beginning_type_setting,
                period_type_setting
            ], 
            [ 
                CurrentEventProcessingSignal.START_OF_EVENT,
                CurrentEventProcessingSignal.NEXT_STEP,
                CurrentEventProcessingSignal.FINISH_OF_EVENT,
                CurrentEventProcessingSignal.OCCURED_IN,
                CurrentEventProcessingSignal.SPENT,
                CurrentEventProcessingSignal.WITH_TIMES,
                CurrentEventProcessingSignal.DAYS_AGO,
                CurrentEventProcessingSignal.LAST_DAYS,
                CurrentEventProcessingSignal.IN_INTERVAL,
                CurrentEventProcessingSignal.JUST_NOW,
            ],
            [
                new TransitionCurrentEventProcessing(workflow_type_setting, event_type_setting),
                new TransitionCurrentEventProcessing(event_type_setting, comment_setting),
                new TransitionCurrentEventProcessing(comment_setting, tag_setting),
                new TransitionCurrentEventProcessing(workflow_type_setting, ressource_type_setting),
            ], 
            this.currentEvent, 
            currentEventProcessingUIAutomationExecutor);

        this.subscriptionCurrentEventNotificationService = this.currentEventNotificationService.captureNotification$.subscribe((eventType) => {
           
            this.eventDescriprionSubject.next(eventType);
            const signal: string = eventType.localizedName;
            this.logger.debug('CurrentEventProcessingUIModel in subscription eventType: ' +  eventType);
            
        });
    }
    
  

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) { }

    navigateTo(action: CurrentEventActions): string {  
        this.currentEvent = this.currentEventProcessingUIAutomation.processSignal(CurrentEventProcessingSignal.NEXT_STEP); //TODO: extend to all actions
        this.logger.debug('CurrentEventProcessingUIModel navigateTo action: ' +  action 
        + ' currentEvent: ' + this.currentEvent
        + ' currentState: ' + this.currentEventProcessingUIAutomation.currentState.name);

        return this.currentEventProcessingUIAutomation.currentState.name;
    }

    doDestroy() {
        this.subscriptionCurrentEventNotificationService.unsubscribe();
    }

   
   
}

class CurrentEventProcessingUIAutomationExecutor implements ICurrentEvenProcessingUIExecutor {
    constructor() { }

    
    
}


// Define the abstract class State with:
// F - (finite state) the generic type for states,
// C - (context) the generic type for context (subject of processing).
abstract class State<F, C> {

    constructor(public name: F) {
    }

    entranceState(subject: C): C{
         //simply clone and return the subject   
        return { ...subject};
    };

    processState(subject: C): C {
        return subject;
    };

    exitState(subject: C) :C {   
        return subject;
    }
   
}

//Define the abstract class Transition with:
// F - the generic type for the source and target state basic type,
// E - (finite state) the generic type for states,
// S - (signal) the generic type for the signal,
// C - (context) the generic type for context (subject of processing).
abstract class Transition<F, E extends State<F,C>, S, C> {
    constructor(
    public from: E,
    public to: E,
    public signal: S) {}
    
    exitAction(from: E, subject: C, to: E, signal: S) :C {
        return subject;
    }
    entranceAction(to: E, subject: C, from: E, signal: S): C{
        return subject;
    };
}

//------------Finite automata -----------------
// Define the abstract class FiniteAutomata with: 
// C - (context) the generic type for context (subject of processing),
// F - (finite state) the generic type for states,
// S - (signal) the generic type for signals,
// T - (transition) the generic type for transitions.
// 
abstract class DetermenisticFiniteAutomatation<F, S, C, E extends State<F,C>, T extends Transition<F,E, S, C>> {

    constructor(private states: E[], 
        private signals: S[], 
        private transitions: T[], 
        private context: C, 
        public currentState: E = states[0]) { 

    }

    processSignal(signal: S): E {
        const transition = this.transitions.find(t => t.signal === signal);
        if (!transition) {
            throw new Error(`Transition not found for current state ${this.currentState.name} and signal ${signal} not found`);
        }

        this.context =transition.exitAction(transition.from, this.context,  transition.to, signal);
        this.context = transition.entranceAction(transition.to, this.context, transition.from, signal);

        this.currentState = transition.to;
        this.context = this.currentState.entranceState(this.context);
        this.context = this.currentState.processState(this.context);
        this.context = this.currentState.exitState(this.context);
        return transition.to;     
    }
}

class CurrentEvent {
}

class EventProcesingState extends State<CurrentEventState, CurrentEvent> {
    constructor(name: CurrentEventState) {
        super(name);
    }

}

class TransitionCurrentEventProcessing extends Transition<string, EventProcesingState, CurrentEventProcessingSignal, CurrentEvent> {
    constructor(from: EventProcesingState, to: EventProcesingState, signal: CurrentEventProcessingSignal = CurrentEventProcessingSignal.START_OF_EVENT) {
        super(from, to, signal);
    }
}

//------------Implementation of determenistic finite automata to our case -----------------

interface ICurrentEvenProcessingUIExecutor {
}
    

class CurrentEventProcessingUIAutomation 
    extends DetermenisticFiniteAutomatation<string, CurrentEventProcessingSignal, CurrentEvent, EventProcesingState, TransitionCurrentEventProcessing> {

    constructor(
        private logger: Logger,
        states: EventProcesingState[], 
        signals: CurrentEventProcessingSignal[], 
        transitions: TransitionCurrentEventProcessing[], 
        context: CurrentEvent, 
        executor : ICurrentEvenProcessingUIExecutor) {
        super(states, signals, transitions, context);
    }

} 








