import { TimeSettingUIModel, ParametersSettingUIModel } from '../capture-ui-model';
import { Observable, Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../shared/services/logging/logger";
import { CurrentEventChangeNotificationService } from "./current-event-notification-service";
import { IRunningEventsBusinessLogicModel } from "../../business-logic-model/running-events-business-logic-model";
import { WorkflowTypeSettingUIModel } from "./workflow-type-setting-ui-model";
import { IEventTypeSettingUIModel } from './event-type-setting-ui-model';
import { IEventChange } from "./current-event-notification-service";
import { State, Transition, DetermenisticFiniteAutomatation } from '../../../../../shared/classes/finite-automation/finite-automation';


//Actions by processing current event
export enum CurrentEventActions {
    FIRST_STEP,
    PREVIOUS_STEP,
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

export interface ICurrentEventProcessingNavigation {
    navigateTo(action: CurrentEventActions): string; 
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

    constructor(private logger: Logger, private currentEventNotificationService: CurrentEventChangeNotificationService) {  

        const workflow_type_setting = new EventProcesingState("workflow-type-selection");
        const event_type_setting1 = new EventProcesingState("event-type-setting");
        const event_type_setting2 = new EventProcesingState("event-type-setting");
        const event_type_setting3 = new EventProcesingState("event-type-setting");
        const ressource_type_setting = new EventProcesingState("ressource-type-setting");
        const date_setting = new EventProcesingState("time-point-setting");
        const time_interval_setting = new EventProcesingState("time-interval-setting");
        const amount_setting = new EventProcesingState("amount-setting");
        const units_setting = new EventProcesingState("units-setting");
        const number_of_times_setting = new EventProcesingState("number-of-times-setting");
        const comment_setting = new EventProcesingState("comment-setting");
        const tag_setting = new EventProcesingState("tag-setting");
        const interval_type_setting = new EventProcesingState("interval-type-setting");
        const beginning_type_setting = new EventProcesingState("beginning-type-setting");
        const period_type_setting = new EventProcesingState("period-type-setting");
        const event_saving = new EventProcesingState("event-saving");
        const parameters_setting = new EventProcesingState("parameters-setting");



        this.currentEventProcessingUIAutomation = new CurrentEventProcessingUIAutomation(
            this.logger,
            [
                new TransitionCurrentEventProcessing(workflow_type_setting, event_type_setting1),
                new TransitionCurrentEventProcessing(event_type_setting1, parameters_setting),
                
                new TransitionCurrentEventProcessing(workflow_type_setting, event_type_setting2, CurrentEventProcessingSignal.FINISH_OF_EVENT),
           
                new TransitionCurrentEventProcessing(comment_setting, tag_setting),
                new TransitionCurrentEventProcessing(workflow_type_setting, ressource_type_setting),

                //Common workflow tail
                new TransitionCurrentEventProcessing(parameters_setting, comment_setting),
                new TransitionCurrentEventProcessing(comment_setting, tag_setting),
                new TransitionCurrentEventProcessing(tag_setting, event_saving)

            ], 
            workflow_type_setting,
            this.currentEvent);

        this.subscriptionCurrentEventNotificationService = this.currentEventNotificationService.eventDescriptionNotification$
            .subscribe((eventChange) => {
           
            this.eventDescriprionSubject.next(eventChange);
      
            this.logger.debug('CurrentEventProcessingUIModel in subscription eventType: ' +  eventChange);
            const signalId: string = eventChange.signalId;    
            this.processSihnalInFA(signalId as CurrentEventProcessingSignal);
            const newSate = this.currentEventProcessingUIAutomation.getCurrentState().uiComponentName;
            this.stateChangeSubject.next(newSate);          
        });
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








