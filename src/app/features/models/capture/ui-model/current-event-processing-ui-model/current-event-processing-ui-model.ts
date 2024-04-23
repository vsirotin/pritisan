import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';

import { Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { WorkflowTypeSelectionUIModel } from "./event-type-selecting-ui-model";
import { IEventTypeSettingUIModel } from './activity-selecting-ui-model';
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
    activityTypeSelectingUIModel!: IEventTypeSettingUIModel;
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


        this.currentEventProcessingUIAutomation = new CurrentEventProcessingUIAutomation(
            this.logger,
            [
                new TransitionCurrentEventProcessing(workflow_type_setting, event_type_setting),
                new TransitionCurrentEventProcessing(event_type_setting, comment_setting),
                new TransitionCurrentEventProcessing(comment_setting, tag_setting),
                new TransitionCurrentEventProcessing(workflow_type_setting, ressource_type_setting),
            ], 
            workflow_type_setting,
            this.currentEvent);

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
        + ' currentState: ' + this.currentEventProcessingUIAutomation.getCurrentState().name);

        return this.currentEventProcessingUIAutomation.getCurrentState().name;
    }

    doDestroy() {
        this.subscriptionCurrentEventNotificationService.unsubscribe();
    }

   
   
}


// Define the abstract class State with:
// C - (context) the generic type for context (subject of processing).
abstract class State<C> {

    constructor(public name: string) {
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
// C - (context) the generic type for context (subject of processing),
// E - (finite state) the generic type for states,
// S - (signal) the generic type for the signal,
abstract class Transition<C, E extends State<C>, S> {
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
// S - (signal) the generic type for signals,
// T - (transition) the generic type for transitions.
// 
abstract class DetermenisticFiniteAutomatation<C, E extends State<C>, S, T extends Transition<C, E, S>> {

    private states!: Set<E>;
    private signals!: Set<S>;
    private currentState!: E;
    private subject!: C;

    constructor(private transitions: T[], initialState: E, initialSubject: C) { 
        this.currentState = initialState;
        this.subject = initialSubject;
        this.states = new Set(transitions.map(t => t.from).concat(transitions.map(t => t.to)));
        this.signals = new Set(transitions.map(t => t.signal));
    }

    processSignal(signal: S): E {
        const transition = this.transitions.find(t => t.signal === signal);
        if (!transition) {
            throw new Error(`Transition not found for current state ${this.currentState.name} and signal ${signal} not found`);
        }

        this.subject =transition.exitAction(transition.from, this.subject,  transition.to, signal);
        this.subject = transition.entranceAction(transition.to, this.subject, transition.from, signal);

        this.currentState = transition.to;
        this.subject = this.currentState.entranceState(this.subject);
        this.subject = this.currentState.processState(this.subject);
        this.subject = this.currentState.exitState(this.subject);
        return transition.to;     
    }

    getCurrentState(): E {
        return this.currentState;
    }

    getSugject(): C {
        return this.subject;
    }
}

class CurrentEvent {
}

class EventProcesingState extends State<CurrentEvent> {

    constructor(state: CurrentEventState) {
        super(state as string);
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








