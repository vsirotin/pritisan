import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';

import { Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventNotificationService } from "../../../../components/capture/current-event/current-event-notification-service";
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { EventTypeSelectingUIModel } from "./event-type-selecting-ui-model";
import { IActivitySelectingUIModel } from './activity-selecting-ui-model';
import { IEventPart } from '../../business-logic-model/current-event-business-logic-model/event-commons';

export enum CurrentEventActions {
    FIRST_STEP,
    PREVIOUS_STEP,
    NEXT_STEP,
    SAVE,
    CANCEL,
    DELETE
}
//------------Current event ui model -----------------

export interface ICurrentEventProcessingUIModel {
  navigateTo(action: CurrentEventActions): string;
  doDestroy(): unknown;

}

export class CurrentEventProcessingUIModel {



    eventSelectionUIModel!: EventTypeSelectingUIModel;
    activityTypeSelectingUIModel!: IActivitySelectingUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;

    private eventDescriprionSubject = new Subject<IEventPart>();

    eventDescriptionChange$ = this.eventDescriprionSubject.asObservable();

    private subscriptionCurrentEventNotificationService!: Subscription;
 
    private currentEvent = new CurrentEvent();

    private currentEventProcessingUIAutomation!: CurrentEventProcessingUIAutomation;

    constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) {  

        const stateEventTypeSelecting = new EventProcesingState('event_type_selecting');
        const stateActivityTypeSelecting = new EventProcesingState('activity_type_selecting');
        const stateTimeSetting = new EventProcesingState('time_setting');
        const stateParametersSettings =  new EventProcesingState('parameters_setting');


   
        const currentEventProcessingUIAutomationExecutor = new CurrentEventProcessingUIAutomationExecutor();
        this.currentEventProcessingUIAutomation = new CurrentEventProcessingUIAutomation(
            this.logger,
            [
                stateEventTypeSelecting, 
                stateActivityTypeSelecting, 
                stateTimeSetting, 
                stateParametersSettings
            ], 
            [ 
                CurrentEventActions.FIRST_STEP,
                CurrentEventActions.PREVIOUS_STEP,
                CurrentEventActions.NEXT_STEP,
                CurrentEventActions.SAVE,
                CurrentEventActions.CANCEL,
                CurrentEventActions.DELETE], 
            [
                new TransitionCurrentEventProcessing(stateEventTypeSelecting, stateActivityTypeSelecting, CurrentEventActions.FIRST_STEP),
                new TransitionCurrentEventProcessing(stateActivityTypeSelecting, stateTimeSetting, CurrentEventActions.PREVIOUS_STEP)
            ], 
            this.currentEvent, 
            currentEventProcessingUIAutomationExecutor);

        this.subscriptionCurrentEventNotificationService = this.currentEventNotificationService.captureNotification$.subscribe((eventType) => {
           
            this.eventDescriprionSubject.next(eventType);
            const signal: string = eventType.name;
            this.logger.debug('CurrentEventProcessingUIModel in subscription eventType: ' +  eventType);
            
        });
    }
    
  

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) { }

    navigateTo(action: CurrentEventActions): string {  
        this.currentEvent = this.currentEventProcessingUIAutomation.processSignal(action);
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

class EventProcesingState extends State<string, CurrentEvent> {

}

class TransitionCurrentEventProcessing extends Transition<string, EventProcesingState, CurrentEventActions, CurrentEvent> {
    constructor(from: EventProcesingState, to: EventProcesingState, signal: CurrentEventActions) {
        super(from, to, signal);
    }
}

//------------Implementation of determenistic finite automata to our case -----------------

interface ICurrentEvenProcessingUIExecutor {
}
    

class CurrentEventProcessingUIAutomation extends DetermenisticFiniteAutomatation<string, CurrentEventActions, CurrentEvent, EventProcesingState, TransitionCurrentEventProcessing> {

    constructor(
        private logger: Logger,
        states: EventProcesingState[], 
        signals: CurrentEventActions[], 
        transitions: TransitionCurrentEventProcessing[], 
        context: CurrentEvent, 
        executor : ICurrentEvenProcessingUIExecutor) {
        super(states, signals, transitions, context);
    }

} 








