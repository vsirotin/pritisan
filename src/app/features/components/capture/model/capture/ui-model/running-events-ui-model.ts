import { EventUIModel } from './capture-ui-model';

import { IRunningEventsBusinessLogicModel, RunningEventsBusinessLogicModel } from '../business-logic-model/running-events-business-logic-model';
import { IEvent } from "../capture-common-interfaces";
import { Logger } from '../../../../../../shared/services/logging/logger';
import { Observable, Subject } from 'rxjs';


export interface IRunningEvent {
    duration: number;
    start: string;
    description: string;
  }

export interface IRunningEventsUIInputModel {

    runningEventsPresentationChanged$: Observable<IRunningEvent[]>;

}

// export interface IRunningEventsUIQueringModel {

// }

export interface IRunningEventsUIModel extends IRunningEventsUIInputModel { 
//    setPresenter(presenter: IRunningEventsUIModelPresenter): void; 
    setBusinessLogicModel(runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel): void;
}


export class RunningEventsUIModel implements IRunningEventsUIModel{

    runningEventsPresentationChanged$!: Observable<IRunningEvent[]>;

    private runningEvents!: IEvent[];

    private runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;

    private subject = new Subject<IRunningEvent[]>();

    constructor(private logger: Logger) {
        this.logger.debug("RunningEventsUIModel.constructor");
        
        this.runningEventsPresentationChanged$ = this.subject.asObservable();

        this.setBusinessLogicModel(new RunningEventsBusinessLogicModel(logger));
    }

    setBusinessLogicModel(runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel): void{
        this.logger.debug("RunningEventsUIModel.setRunningEventsBusinessLogicModel start ");
        this.runningEventsBusinessLogicModel = runningEventsBusinessLogicModel;
        this.runningEventsBusinessLogicModel.runningEventsChanged$.subscribe((events) => {
            this.logger.debug("RunningEventsUIModel.setRunningEventsBusinessLogicModel. Running events: " + events.length);
            this.runningEvents = events;
            const runningEventsPresentation: IRunningEvent[] = events.map((event) => this.covertEventToPresentation(event));
            this.logger.debug("RunningEventsUIModel.setRunningEventsBusinessLogicModel. Running events presentation: " 
                + runningEventsPresentation.length);
            this.subject.next(runningEventsPresentation);   
        });
    }
    covertEventToPresentation(event: IEvent): IRunningEvent {
        return {duration: 0, start: "xxx", description: "yyy"};
    }
}
