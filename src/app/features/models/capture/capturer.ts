import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IActityTypeProvider, IClosedEvent, IEventTimeDetailsProvider, IEventType, IEventTypeProvider, IRunningEvent, ITimeIntervalProvider, ITimePoint, ITimePointEvent } from "./business-logic-model/current-event-business-logic-model/event-commons";
import { TimeSeriesDB } from "../../../shared/classes/db/time-series-db/time-series-db";

export class Capturer  {
    
    static saveCurrentEvent() {
      Capturer.instance.saveCurrentEvent();
    }

    static setEventTypeProvider(provider: IEventTypeProvider): void {
        Capturer.instance.eventTypeProvider = provider;
    }

    static setTimeIntervalProvider(provider: ITimeIntervalProvider): void {
        Capturer.instance.timeIntervalProvider = provider;
    }

    static setEventTimeDetailsProvider(provider: IEventTimeDetailsProvider): void {
        Capturer.instance.eventTimeDetailsProvider = provider;
    }


    static setActivityTypeProvider(provider: IActityTypeProvider): void {
        Capturer.instance.activitTypeProvider = provider;
    }

    private static instance: Capturer = new Capturer();

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

