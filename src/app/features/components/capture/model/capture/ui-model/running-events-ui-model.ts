import { EventUIModel } from './capture-ui-model';

import { IRunningEventsBusinessLogicModel } from '../business-logic-model/running-events-business-logic-model';
import { IEvent } from "../capture-common-interfaces";
import { Logger } from '../../../../../../shared/services/logging/logger';


export interface IRunningEventsUIModelPresenter {

    setRunningEvents(runningEvents: IEvent[]): void;
}

export interface IRunningEventsUIInputModel {

}

export interface IRunningEventsUIQueringModel {

}

export interface IRunningEventsUIModel extends IRunningEventsUIInputModel, IRunningEventsUIQueringModel { 
    setPresenter(presenter: IRunningEventsUIModelPresenter): void;  
}


export class RunningEventsUIModel implements IRunningEventsUIModel{

    private runningEvents!: IEvent[];

    private presenter!: IRunningEventsUIModelPresenter;

    constructor(private logger: Logger) {
        this.logger.debug("RunningEventsUIModel.constructor");
    }

    setPresenter(presenter: IRunningEventsUIModelPresenter): void{
        this.presenter = presenter;
    }

    
}
