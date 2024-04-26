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

//Defines types of workflows that can be processed
export interface IEventProcessingWorkflowType extends IEventChange{};




