import { EventUIModel } from './capture-ui-model';

import { IRunningEventsBusinessLogicModel, RunningEventsBusinessLogicModel } from '../business-logic-model/running-events-business-logic-model';
import { IEvent } from "../capture-common-interfaces";
import { Logger } from '../../../../../../shared/services/logging/logger';
import { Observable, Subject } from 'rxjs';


export interface IRunningEvent {
    id: number
    duration: string;
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
            const runningEventsPresentation: IRunningEvent[] = events.sort((a,b)=>this.sortEvents(a, b))
                .map((event) => this.covertEventToPresentation(event));

            this.logger.debug("RunningEventsUIModel.setRunningEventsBusinessLogicModel. Running events presentation: " 
                + runningEventsPresentation.length);
            this.subject.next(runningEventsPresentation);   
        });
    }
    sortEvents(a: IEvent, b: IEvent): number {
        return b.start['getTime']() - a.start['getTime']();
    }
    covertEventToPresentation(event: IEvent): IRunningEvent {
        const now = new Date();
        const start = event.start as Date; //To avoid sysntay error
        const durationMilliseconds = now.getTime() - start.getTime();
        const startAsString = start.toLocaleDateString() + " " + start.toLocaleTimeString();
        let durationSeconds = Math.floor(durationMilliseconds / 1000);
        let durationMinutes = Math.floor(durationSeconds / 60);
        let durationHours = Math.floor(durationMinutes / 60);
        let duration = "";
        if(durationHours > 0){
            duration += durationHours + "h ";
            durationMinutes -= durationHours * 60;
        }

        duration += durationMinutes + "m ";

        return {id: event.id, duration: duration, start: startAsString, description: "yyy"};
    }
}


