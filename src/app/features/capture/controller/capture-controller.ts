import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IActityTypeProvider, IActivityType, IClosedEvent, IEventTimeDetailsProvider, IEventType, IEventTypeProvider, IRunningEvent, ITimeIntervalProvider, ITimePoint, ITimePointEvent } from "../../models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { TimeSeriesDB } from "../../../shared/classes/db/time-series-db/time-series-db";
import { Observable, Subject } from "rxjs";

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

export interface IUpdateActityTypeReceiver {
    activityTypeUpdated(activityType: IActivityType): void;
}

export class CurrentEventController implements ICurrentEventController, ICurrentEventDataGetter, IEventTypeUpdateReceiver, IUpdateActityTypeReceiver {
   
    logger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventController");

    private stateChangeSubject = new Subject<string>();
    stateChange$: Observable<string> = this.stateChangeSubject.asObservable();

    constructor( ) {
        this.logger.debug("CurrentEventController created");
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
        throw new Error("Method not implemented.");
    }

}

export class CaptureController   {

    private static readonly currentEventController = new CurrentEventController();
   

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
    
    static saveCurrentEvent() {
      CaptureController.instance.saveCurrentEvent();
    }

    static setEventTypeProvider(provider: IEventTypeProvider): void {
        CaptureController.instance.eventTypeProvider = provider;
    }

    static setTimeIntervalProvider(provider: ITimeIntervalProvider): void {
        CaptureController.instance.timeIntervalProvider = provider;
    }

    static setEventTimeDetailsProvider(provider: IEventTimeDetailsProvider): void {
        CaptureController.instance.eventTimeDetailsProvider = provider;
    }


    static setActivityTypeProvider(provider: IActityTypeProvider): void {
        CaptureController.instance.activitTypeProvider = provider;
    }

    private static instance: CaptureController = new CaptureController();

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.Capturer");
    
    private eventTypeProvider!: IEventTypeProvider;
    private eventTimeDetailsProvider!: IEventTimeDetailsProvider;
    private timeIntervalProvider!: ITimeIntervalProvider;
    private activitTypeProvider!: IActityTypeProvider;

    



    private saveCurrentEvent() {   
        
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
            return
        } 


        const isRunningEvent = this.eventTimeDetailsProvider.getIsRunningEvent();

        if(isRunningEvent){
             this.saveRunningEvent(eventTypeId, eventTypeName);
             return;
        } 
        
        this.saveClosedEvent(eventTypeId, eventTypeName);
    }
    saveRunningEvent(eventTypeId: number, eventTypeName: string) {
        const runningEvent: IRunningEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            startTime: this.timeIntervalProvider.getStartTimePoint(),
            activityTypeId: this.activitTypeProvider.getActivityType().activityTypeId,
            activityTypeName: this.activitTypeProvider.getActivityType().activityName
        };
        this.logger.debug("saveRunningEvent: ", runningEvent);
        TimeSeriesDB.saveRunningEvent(runningEvent);
    }
    
    saveTimePointEvent(eventTypeId: number, eventTypeName: string) {
        const timePointEvent : ITimePointEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            eventTimePoint: this.timeIntervalProvider.getStartTimePoint(),
            activityTypeId: this.activitTypeProvider.getActivityType().activityTypeId,
            activityTypeName: this.activitTypeProvider.getActivityType().activityName
        };
        this.logger.debug("saveTimePointEvent: ", timePointEvent);
        TimeSeriesDB.saveTimePointEvent(timePointEvent);
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
        TimeSeriesDB.saveClosedEvent(closedEvent);
    }
    
}

