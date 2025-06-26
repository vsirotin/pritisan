import { Data } from "@angular/router";


//TODO : Remove this interface when it is not used anymore
// export function encodePersistedEvent(event: IPersistedEvent): IEvent {
//     return {
//         id: event.id,
//         start: event.start,
//         fin: event.fin,
//         typeId: event.typeId,
//         details: event.details
//     };
// }

// export interface IReceiverEventPartUpdates {
//     addEventPart(eventPart: IEventChange): void;
// }

export interface IEventType {
   name: string;
   id: number;
}

export interface IAlternativeList {
    alternatives: IEventType[];
    currentAlternativeId: number;
    groupLabel: string; 
 }

 export interface IPersistedEvent{
    id: number
    start: Data;
    fin: Data|null;
    typeId: string;
    details: string|null;
}

export interface ITimePoint {
    year: number;
    month: number; // January is 1
    dayOfMonth: number; // 1-31
    hour: number;
    minute: number;
}

export interface ITimeInterval {
    startTime: ITimePoint;
    endTime: ITimePoint;
}

export interface IEventBody {
  eventTypeId: number;
  eventTypeName: string;  
  activityTypeId: string;
  activityTypeName: string;
  eventData?: any;
}

export interface IClosedEvent extends ITimeInterval, IEventBody {
}

export interface IRunningEvent extends IEventBody {
    startTime: ITimePoint;
}

export interface ITimePointEvent extends IEventBody {
    eventTimePoint: ITimePoint;
}

export interface IEventTimeDetailsProvider {
    /**
     * Returns true if the event is running, false otherwise.
     * This is used to determine if the event is currently active or not.
     * @returns {boolean} - true if the event is running, false otherwise.
     */
    getIsRunningEvent(): boolean;

    /**
     * Returns true if the event is a time point event, false otherwise.
     * This is used to determine if the event is a single point in time or a time interval.
     * @returns {boolean} - true if the event is a time point event, false otherwise.
     */
    getIsTimePointEvent(): boolean;
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





