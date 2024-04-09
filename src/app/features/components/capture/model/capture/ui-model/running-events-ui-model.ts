import { EventUIModel } from './capture-ui-model';

import { IRunningEventsBusinessLogicModel, RunningEventsBusinessLogicModel } from '../business-logic-model/running-events-business-logic-model';
import { IEvent } from "../capture-common-interfaces";
import { Logger } from '../../../../../../shared/services/logging/logger';
import { Observable, Subject, Subscription } from 'rxjs';


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
    selectRunningEvent(event: IRunningEvent): void; 
    setBusinessLogicModel(runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel): void;
    completeEventsWithIds(eventIDs: number[]): void;
    deleteEventsWithIds(eventIDs: number[]): void;
    currentEventChanged$: Observable<IRunningEvent>;
}


export class RunningEventsUIModel implements IRunningEventsUIModel{

    runningEventsPresentationChanged$!: Observable<IRunningEvent[]>;
    currentEventChanged$!: Observable<IRunningEvent>;

    private runningEvents!: IEvent[];

    private runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;

    private subjectRunningEvents = new Subject<IRunningEvent[]>();

    private subscriptionRunningEvents$!: Subscription

    private intervalId! : any;

    private subjectCurrentEvent = new Subject<IRunningEvent>();

    constructor(private logger: Logger) {
        this.logger.debug("RunningEventsUIModel.constructor");
        
        this.runningEventsPresentationChanged$ = this.subjectRunningEvents.asObservable();
        this.currentEventChanged$ = this.subjectCurrentEvent.asObservable();

        this.setBusinessLogicModel(new RunningEventsBusinessLogicModel(logger));
    }

    selectRunningEvent(event: IRunningEvent): void {
        this.subjectCurrentEvent.next(event);
    }

    completeEventsWithIds(eventIDs: number[]): void {
        this.runningEventsBusinessLogicModel.completeEventsWithIds(eventIDs);
    }
    deleteEventsWithIds(eventIDs: number[]): void {
        this.runningEventsBusinessLogicModel.deleteEventsWithIds(eventIDs);
    }

    setBusinessLogicModel(runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel): void{
        this.logger.debug("RunningEventsUIModel.setRunningEventsBusinessLogicModel start ");
        this.runningEventsBusinessLogicModel = runningEventsBusinessLogicModel;
        this.subscriptionRunningEvents$ = this.runningEventsBusinessLogicModel.runningEventsChanged$.subscribe((events) => {
            this.runningEvents = events;
            this.convertAndNotifyEvents(); 
            
            if(this.intervalId !== undefined){
                clearInterval(this.intervalId);
            }

            this.intervalId = setInterval(() => {
                this.convertAndNotifyEvents();
            }, 60*1000);
        });
    }
    private convertAndNotifyEvents() {
        const runningEventsPresentation: IRunningEvent[] = this.runningEvents.sort((a, b) => this.sortEvents(a, b))
            .map((event) => this.covertEventToPresentation(event));

        this.logger.debug("RunningEventsUIModel.convertAndNotifyEvents. Running events presentation: " + JSON.stringify(runningEventsPresentation));
        this.subjectRunningEvents.next(runningEventsPresentation);

    }

    sortEvents(a: IEvent, b: IEvent): number {
        return b.start['getTime']() - a.start['getTime']();
    }
    covertEventToPresentation(event: IEvent): IRunningEvent {
        const now = new Date();
        const start = event.start as Date; //To avoid sysntax error
        const durationMilliseconds = now.getTime() - start.getTime();
        const startAsString = start.toLocaleDateString() + " " + start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
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


