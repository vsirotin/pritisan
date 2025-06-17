import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IEventType } from "./business-logic-model/current-event-business-logic-model/event-commons";

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

    static setActivityTypeProvider(provider: IActityTypeProvider): void {
        Capturer.instance.activitTypeProvider = provider;
    }

    private static instance: Capturer = new Capturer();

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.Capturer");
    
    private eventTypeProvider!: IEventTypeProvider;
    private timeIntervalProvider!: ITimeIntervalProvider;
    private activitTypeProvider!: IActityTypeProvider;

    private saveClosedEvent(event: IClosedEvent): void {
        this.logger.debug("saveClosedEvent: " + JSON.stringify(event));
    }

        private saveCurrentEvent() {   
            
        const eventType = this.eventTypeProvider.getEventType();
        const eventTypeId = eventType.id;
        const eventTypeName = eventType.name;    
        const startTimePoint = this.timeIntervalProvider.getStartTimePoint();
        const endTimePoint = this.timeIntervalProvider.getEndTimePoint();

        const activityType = this.activitTypeProvider.getActivityType();
        const activityTypeId = activityType.activityTypeId;
        const activityTypeName = activityType.activityName;

        const closedEvent: IClosedEvent = {
            eventTypeId: eventTypeId,
            eventTypeName: eventTypeName,
            startTime: startTimePoint,
            endTime: endTimePoint,
            activityTypeId: activityTypeId,
            activityTypeName: activityTypeName
        };

        this.saveClosedEvent(closedEvent);
    }
}

export interface ITimePoint {
  date: Date;
  hour: number;
  minute: number;
}

export interface IClosedEvent {
  eventTypeId: number;
  eventTypeName: string;  
  startTime: ITimePoint;
  endTime: ITimePoint;
  activityTypeId: string;
  activityTypeName: string;
}


export interface ITimeIntervalProvider {
    getStartTimePoint(): ITimePoint
    getEndTimePoint(): ITimePoint
}

export interface IActivityType {
    activityTypeId: string
    activityName: string
}

export interface IActityTypeProvider {
    getActivityType() : IActivityType;
}


export interface IEventTypeProvider {
    getEventType() : IEventType;
}

