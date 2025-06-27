import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { Observable, Subject } from "rxjs";
import { IActityTypeProvider, IActivityType, IClosedEvent, IEventTimeDetailsProvider, IEventType, IEventTypeProvider, IRunningEvent, ITimeIntervalProvider, ITimePointEvent } from "../commons/event-commons";
import { ICurrentEventPersistence, TimeSeriesDB } from "../db/time-series/time-series-db";
import { TimeIntervalSettingComponent } from "../current-event/time-interval-setting/time-interval-setting.component";


export interface ICurrentEventController {
    getCurrentEventDataGetter(): ICurrentEventDataGetter;
}

export interface ICurreentEventDataSetter{}

export interface ICurrentEventDataGetter {
    stateChange$: Observable<string>;
}

export interface IEventTypeUpdateReceiver {
    eventTypeUpdated(eventType: IEventType): void;
}

// This interface is used to receive and execute user actions with current event.
export interface ICurrentEventUserActionsReceiver{
    // This method is called when the user wants to save the current event.
    saveCurrentEvent(): void;
}

export interface IUpdateActityTypeReceiver {
    activityTypeUpdated(activityType: IActivityType): void;
}

export interface IUpdateTimeIntervalReceiver {
    timeIntervalUpdated(activityType: IActivityType): void;
}

// This interface is used to get the data about time interval validation.
export interface ITimeIntervaValidationData {
    //Is the time interval valid
    hasErrors: boolean 

    //Error code, if any
    errorCode?: string;

    //Error description, if any
    errorDescription?: string;

    //Explanation of the error, if any
    errorExplonation?: string;
}
export interface ICurrentEventValidationDataReceiver {
    setValidationData(validationData: ITimeIntervaValidationData): void;
}

// This class is responsible for managing the current event state and notifying subscribers about changes.
// It implements the ICurrentEventController interface and provides a way to get the current event data.
// It also implements the IEventTypeUpdateReceiver and IUpdateActityTypeReceiver interfaces to handle updates to event types and activity types respectively.
// The stateChangeSubject is used to emit state changes,
// and the stateChange$ observable allows subscribers to listen for these changes.
class CurrentEventController implements ICurrentEventController, 
    ICurrentEventDataGetter, 
    IEventTypeUpdateReceiver, 
    IUpdateActityTypeReceiver,
    IUpdateTimeIntervalReceiver {
   
    logger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventController");

    private stateChangeSubject = new Subject<string>();
    stateChange$: Observable<string> = this.stateChangeSubject.asObservable();
    validationDataReceiver!: ICurrentEventValidationDataReceiver

    constructor( ) {
        this.logger.debug("CurrentEventController created");
    }
    timeIntervalUpdated(activityType: IActivityType): void {
        throw new Error("Method not implemented.");
    }

    getCurrentEventDataGetter(): ICurrentEventDataGetter {
        return this;
    }

    //--- Implementation of IEventTypeUpdateReceiver ---

    eventTypeUpdated(eventType: IEventType): void {
        let newState = "workflow-event-processing";
        switch (eventType.id) {
            case 2:
                newState = "workflow-ressource-processing";
                break;
            case 3:
                newState = "workflow-observation-processing";
                break;    

        }
        this.stateChangeSubject.next(newState); 
    }

    //--- Implementation of IUpdateActityTypeReceiver ---

    activityTypeUpdated(activityType: IActivityType): void {
        throw new Error("Method not implemented."); //TODO
    }

}

// This class is responsible for saving the current event.
class CurrentEventSaver implements ICurrentEventUserActionsReceiver {

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.Capturer");

    eventTypeProvider!: IEventTypeProvider;
    eventTimeDetailsProvider!: IEventTimeDetailsProvider;
    timeIntervalProvider!: ITimeIntervalProvider;
    activitTypeProvider!: IActityTypeProvider;
    currentEventPersistence : ICurrentEventPersistence = TimeSeriesDB.getCurrentEventPersistence();

    //-- Implementation of ICurrentEventUserActionsReceiver ---

    // This method is called when the user wants to save the current event.
    saveCurrentEvent(): void {

        const eventType = this.eventTypeProvider.getEventType();
        const eventTypeId = eventType.id;

        switch (eventTypeId) {
            case 1: // Activity started or/and finished
                this.saveActivity(eventType);
                break;
            case 2: // Money, resources used
            case 3: // Observation made
                break;
            default:
                this.logger.error("Unknown event type: " + eventTypeId);
                return;
        }

    }

    private saveActivity(eventType: IEventType) {
        const eventTypeId = eventType.id;
        const eventTypeName = eventType.name;

        const isTimePoitnEvent = this.eventTimeDetailsProvider.getIsTimePointEvent();

        if (isTimePoitnEvent) {
            this.saveTimePointEvent(eventTypeId, eventTypeName);
            return;
        }


        const isRunningEvent = this.eventTimeDetailsProvider.getIsRunningEvent();

        if (isRunningEvent) {
            this.saveRunningEvent(eventTypeId, eventTypeName);
            return;
        }

        this.saveClosedEvent(eventTypeId, eventTypeName);
    }

    private saveRunningEvent(eventTypeId: number, eventTypeName: string) {
        const runningEvent: IRunningEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            startTime: this.timeIntervalProvider.getStartTimePoint(),
            activityTypeId: this.activitTypeProvider.getActivityType().activityTypeId,
            activityTypeName: this.activitTypeProvider.getActivityType().activityName
        };
        this.logger.debug("saveRunningEvent: ", runningEvent);
        this.currentEventPersistence.saveRunningEvent(runningEvent);
    }

    private saveTimePointEvent(eventTypeId: number, eventTypeName: string) {
        const timePointEvent: ITimePointEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            eventTimePoint: this.timeIntervalProvider.getStartTimePoint(),
            activityTypeId: this.activitTypeProvider.getActivityType().activityTypeId,
            activityTypeName: this.activitTypeProvider.getActivityType().activityName
        };
        this.logger.debug("saveTimePointEvent: ", timePointEvent);
        this.currentEventPersistence.saveTimePointEvent(timePointEvent);
    }

    private saveClosedEvent(eventTypeId: number, eventTypeName: string) {
        const activityType = this.activitTypeProvider.getActivityType();
        const activityTypeId = activityType.activityTypeId;
        const activityTypeName = activityType.activityName;

        const startTimePoint = this.timeIntervalProvider.getStartTimePoint();
        const endTimePoint = this.timeIntervalProvider.getEndTimePoint();

        const closedEvent: IClosedEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            startTime: startTimePoint,
            endTime: endTimePoint,
            activityTypeId: activityTypeId,
            activityTypeName: activityTypeName
        };
        this.logger.debug("saveClosedEvent: ", closedEvent);
        this.currentEventPersistence.saveClosedEvent(closedEvent);
    }

}



// This claas is a facade for accessing the current event controller and its related functionalities.
// It provides static methods to get the current event controller, event type update receiver, activity type receiver, and current event user actions receiver.
// It also provides static methods to set the event type provider, time interval provider, event time details provider, and activity type provider.
// This allows for easy access to the current event processing functionalities without needing to instantiate the controller directly.
export class CaptureController  {

    private static readonly currentEventController = new CurrentEventController();
    private static currentEventSaver: CurrentEventSaver = new CurrentEventSaver();
   

    private static ICurrentEventController: ICurrentEventController;   
    
    static getCurrentEventController(): ICurrentEventController {
        return CaptureController.currentEventController;
    }

    static getEventTypeUpdateReceiver(): IEventTypeUpdateReceiver {
      return CaptureController.currentEventController;
    }

    static getUpdateActityTypeReceiver(): IUpdateActityTypeReceiver {
      return CaptureController.currentEventController;
    }

    static getCurrentEventUserActionsReceiver(): ICurrentEventUserActionsReceiver {
        return CaptureController.currentEventSaver;
    }

    static getIUpdateimeIntervalReceiver(): IUpdateTimeIntervalReceiver {
        return CaptureController.currentEventController;
    }
    

    static setEventTypeProvider(provider: IEventTypeProvider): void {
        CaptureController.currentEventSaver.eventTypeProvider = provider;
    }

    static setTimeIntervalProvider(provider: ITimeIntervalProvider): void {
        CaptureController.currentEventSaver.timeIntervalProvider = provider;
    }

    static setEventTimeDetailsProvider(provider: IEventTimeDetailsProvider): void {
        CaptureController.currentEventSaver.eventTimeDetailsProvider = provider;
    }


    static setActivityTypeProvider(provider: IActityTypeProvider): void {
        CaptureController.currentEventSaver.activitTypeProvider = provider;
    }

    static setCurrentEventValidationDataReceiver(validationDataReceiver: ICurrentEventValidationDataReceiver): void {
       CaptureController.currentEventController.validationDataReceiver = validationDataReceiver;
    }
    
}


