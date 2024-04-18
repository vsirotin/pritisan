import { IPersistedEvent } from "../../../../../shared/classes/db/time-series-db";
import { IEvent } from "../../capture-common-interfaces";


export function encodePersistedEvent(event: IPersistedEvent): IEvent {
    return {
        id: event.id,
        start: event.start,
        fin: event.fin,
        typeId: event.typeId,
        details: event.details
    };
}

export interface IReceiverEventPartUpdates {
    addEventPart(eventPart: IEventPart): void;
}

export interface IEventType {
    id: number
    name: string;
}

export interface IActivityType {
    id: number
    name: string;
}

export interface IEventPart {
    stepNumber: number
    id: number|undefined;
    name: string;
}
