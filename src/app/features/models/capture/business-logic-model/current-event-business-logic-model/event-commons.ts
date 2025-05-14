import { IPersistedEvent } from "../../../../../shared/classes/db/time-series-db";
import { IEvent } from "../../capture-common-interfaces";
import { IEventChange } from '../../ui-model/current-event-processing-ui-model/current-event-processing-ui-model';


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
    addEventPart(eventPart: IEventChange): void;
}

export interface IEventType {
   name: string;
   id: number;
}

export interface IAlternativeList {
    alternatives: IEventType[];
    currentAlternativeId: number;
    titleForAlternativeSelection: string; // title for the alternative selection presented for the user
 }




