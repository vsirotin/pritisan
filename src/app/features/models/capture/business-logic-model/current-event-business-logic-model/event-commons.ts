import { Data } from "@angular/router";
import { IEvent } from "../../capture-common-interfaces";
import { IEventChange } from '../../ui-model/current-event-processing-ui-model/current-event-processing-ui-model';


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
  date: Date;
  hour: number;
  minute: number;
}

export interface ITimeInterval {
    startTime: ITimePoint;
    endTime: ITimePoint;
}

export interface IClosedEvent extends ITimeInterval {
  eventTypeId: number;
  eventTypeName: string;  
  activityTypeId: string;
  activityTypeName: string;
  eventData?: any;
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





