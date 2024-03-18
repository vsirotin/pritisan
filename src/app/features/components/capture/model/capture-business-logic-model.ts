import { Subject } from "rxjs";


export interface ICaptureBusinessLogicModel {
    load(): unknown;
    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel: IEventBusinessLogicModel;
}

export class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel = new RepositoryBusinessLogicModel();
    runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel!: IEventBusinessLogicModel;
    
    constructor() {
        
    }
    load(){
        //TODO Temporyry implementation!!!!
        console.log("CaptureBusinessLogicModel.load repositoryBusinessLogicModel: ", this.repositoryBusinessLogicModel);
        if(this.repositoryBusinessLogicModel) {
            this.repositoryBusinessLogicModel.currentEventPosition = -1;
            this.repositoryBusinessLogicModel.countEvents = 0;
        }

    }
}

export interface IRepositoryBusinessLogicModel {
    currentEventPosition: number;
    countEvents: number;

    navigateTo(element: RepositoryNavigationAction): void;

    updateDefaultEvent():void

}

export class RepositoryBusinessLogicModel implements IRepositoryBusinessLogicModel {
    

    currentEventPosition: number = 0;
    countEvents: number = 0;
    
    constructor() {}

    navigateTo(element: RepositoryNavigationAction): void {
        console.log("RepositoryBusinessLogicModel.navigateTo element: ", element);
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                //TODO
            case RepositoryNavigationAction.PREVIOUS:
                //TODO
            case RepositoryNavigationAction.NEXT:
                //TODO
            case RepositoryNavigationAction.NEXT_PAGE:
                //TODO
            case RepositoryNavigationAction.LAST:  
                //TODO   
            default: // equal RepositoryNavigationAction.NEW
                this.updateDefaultEvent();
        }
       
    }

    updateDefaultEvent():void {
    }

    async calculateNewRepositoryState(where: string): Promise<IRepositoryStateExtended> {
        return new Promise<IRepositoryStateExtended>((resolve, reject) => {
            resolve({repositoryState: {countEventsInRepository: 0, currentEventPosition: 0}, currentEvent: {duration: 0, start: "", type: "", details: ""}});
        });
    }
}


//------------Running events behavior model----------------

export interface IRunningEventsBusinessLogicModel {
   
}

class RunningEventsBusinessLogicModel implements IRunningEventsBusinessLogicModel {
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

//------------Current event behavior model----------------
export interface IEventBusinessLogicModel { 
}

export enum RepositoryNavigationAction {
    PREVIOUS_PAGE,
    PREVIOUS,
    NEXT,
    NEXT_PAGE,
    LAST,
    NEW
}
