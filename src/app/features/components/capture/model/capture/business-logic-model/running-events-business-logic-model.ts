//------------Running events behavior model----------------

import { Observable, Subject } from "rxjs";
import { IEvent } from "../capture-common-interfaces";
import { Logger } from "../../../../../../shared/services/logging/logger";
import { IPersistedRunningEvents, RunningEventsPersistence } from "../../../../../../shared/classes/db/running-events-db";
import { encodePersistedEvent } from "./event-commons";

export interface IRunningEventsBusinessLogicModel {
    readRunninfEventsFromDB(): unknown;
    runningEventsDB: IPersistedRunningEvents;
    runningEventsChanged$: Observable<IEvent[]>;

    completeEventsWithIds(eventIDs: number[]): void;
    deleteEventsWithIds(eventIDs: number[]): void;
}

export class RunningEventsBusinessLogicModel implements IRunningEventsBusinessLogicModel {
    runningEventsChanged$: Observable<IEvent[]>;
    runningEventsDB! : IPersistedRunningEvents;

    runningEvents!: IEvent[];
    private subjectRunningEventsChanged = new Subject<IEvent[]>();

    constructor(private logger: Logger) {
        this.logger.debug("RunningEventsBusinessLogicModel.constructor");
        
        this.runningEventsChanged$ = this.subjectRunningEventsChanged.asObservable();

        this.runningEventsDB = new RunningEventsPersistence(logger);

        this.readRunninfEventsFromDB();

    }
    async readRunninfEventsFromDB() {
        this.runningEventsDB.readRunningEvents().then((events) => {
            this.runningEvents = events.map((event) => encodePersistedEvent(event));
            this.logger.debug("RunningEventsBusinessLogicModel.constructor. Running events: " + this.runningEvents.length);
            this.subjectRunningEventsChanged.next(this.runningEvents);
        });
    }

    completeEventsWithIds(eventIDs: number[]): void {
        this.updateEventList(eventIDs);
        this.logger.debug("RunningEventsBusinessLogicModel.completeEventsWithIds. completed eventIDs: " + eventIDs
        + " runningEvents: " + JSON.stringify(this.runningEvents));
    }

    deleteEventsWithIds(eventIDs: number[]): void {
        this.updateEventList(eventIDs);
        this.logger.debug("RunningEventsBusinessLogicModel.deleteEventsWithIds. deleted eventIDs: " + eventIDs
        + " runningEvents: " + JSON.stringify(this.runningEvents));
    }


    private updateEventList(eventIDs: number[]) {
        this.runningEventsDB.deleteEventsWithIds(eventIDs).then(() => {
            this.runningEvents = this.runningEvents.filter((event) => !eventIDs.includes(event.id));
            this.subjectRunningEventsChanged.next(this.runningEvents);
        });
    }

   
}


