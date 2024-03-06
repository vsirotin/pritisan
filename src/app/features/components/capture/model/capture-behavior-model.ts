import { Subject } from "rxjs";

// Behavior-model for the capture

export interface ICaptureBehaviorModel {
    repositoryNavigationBehaviorModel: IRepositoryNavigationBehaviorModel;
}

export class CaptureBehaviorModel implements ICaptureBehaviorModel{

    repositoryNavigationBehaviorModel: IRepositoryNavigationBehaviorModel = new RepositoryNavigationBehaviorModel();
    runningEventsBehaviorModel: IRunningEventsBehaviorModel = new RunningEventsBehaviorModel();
    
    constructor() {
        
    }
}

//------------Navigation behavior model----------------
export interface IRepositoryNavigationBehaviorModel {
    navigateTo(where: string): unknown;
    repositoryStateChangeNotificator$: Subject<IRepositoryStateExtended>;
}

class RepositoryNavigationBehaviorModel implements IRepositoryNavigationBehaviorModel {
    repositoryStateChangeNotificator$: Subject<IRepositoryStateExtended> = new Subject<IRepositoryStateExtended>();
    
    constructor() {}

    navigateTo(where: string): void {

        this.calculateNewRepositoryState(where).then((repositoryStateExtended: IRepositoryStateExtended) => {
            this.repositoryStateChangeNotificator$.next(repositoryStateExtended);
            }
        )
    }

    async calculateNewRepositoryState(where: string): Promise<IRepositoryStateExtended> {
        return new Promise<IRepositoryStateExtended>((resolve, reject) => {
            resolve({repositoryState: {countEventsInRepository: 0, currentEventPosition: 0}, currentEvent: {duration: 0, start: "", type: "", details: ""}});
        });
    }
}


//------------Running events behavior model----------------

export interface IRunningEventsBehaviorModel {
   
}

class RunningEventsBehaviorModel implements IRunningEventsBehaviorModel {
    constructor() {
        
    }
}

export interface IRepositoryState {
    countEventsInRepository: number;
    currentEventPosition: number;
}

export interface ICurrentEvent {    
    duration: number;
    start: string;
    type: string;
    details: string;
}  

export interface IRepositoryStateExtended {
    repositoryState: IRepositoryState;
    currentEvent: ICurrentEvent;
}
