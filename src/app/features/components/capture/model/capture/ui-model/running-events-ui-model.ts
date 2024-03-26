import { EventUIModel } from './capture-ui-model';

import { IRunningEventsBusinessLogicModel } from '../business-logic-model/running-events-business-logic-model';


//------------Running events ui model----------------
// UI model for events/events saved in the repository

export class RunningEventsUIModel {

    // The list of runing events/events
    runningEvents: EventUIModel[] = [];

    loadFrom(runningEventsModel: IRunningEventsBusinessLogicModel) { }
}
