//------------Running events behavior model----------------

import { Observable, Subject } from "rxjs";
import { IEvent } from "../capture-common-interfaces";
import { Logger } from "../../../../../../shared/services/logging/logger";
import { IPersistedRunningEvents, RunningEventsPersistence } from "../../../../../../shared/classes/db/time-series-db";
import { encodePersistedEvent } from "./event-converter";

export interface IRunningEventsBusinessLogicModel {
    runningEventsChanged$: Observable<IEvent[]>;
}

export class RunningEventsBusinessLogicModel implements IRunningEventsBusinessLogicModel {
    runningEventsChanged$: Observable<IEvent[]>;
    runningEventsDB! : IPersistedRunningEvents;

    runningEvents!: IEvent[];

    constructor(private logger: Logger) {
        this.logger.debug("RunningEventsBusinessLogicModel.constructor");
        const subject = new Subject<IEvent[]>();
        this.runningEventsChanged$ = subject.asObservable();

        this.runningEventsDB = new RunningEventsPersistence(logger);

        this.runningEventsDB.readRunningEvents().then((events) => {
            this.runningEvents = events.map((event) => encodePersistedEvent(event));
            logger.debug("RunningEventsBusinessLogicModel.constructor. Running events: " + this.runningEvents.length);
            subject.next(this.runningEvents);
        });

    }
}


