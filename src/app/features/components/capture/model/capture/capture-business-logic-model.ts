import { Logger } from "../../../../../shared/services/logging/logger";
import { ITimeSeriesDB, TimeSeriesDB } from "../../../../../shared/classes/time-series/time-series-db";
import { IRepositoryMetaData } from "./capture-model-interfaces";


export interface ICaptureBusinessLogicModel {
    load(): unknown;
    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel: IEventBusinessLogicModel;
    setTimeSeriesDB(timeSeriesDB: ITimeSeriesDB): void;
}

export class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    repositoryBusinessLogicModel!: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel!: IEventBusinessLogicModel;
    logger!: Logger;
    private timeSeriesDB!: ITimeSeriesDB;
    
    constructor(logger: Logger) {
        this.logger = logger;  
        this.repositoryBusinessLogicModel = new RepositoryBusinessLogicModel(logger);
    }

    setTimeSeriesDB(timeSeriesDB: ITimeSeriesDB): void{
        this.timeSeriesDB = timeSeriesDB;
    }

    load(){
        //TODO Temporyry implementation!!!!
        this.logger.debug("CaptureBusinessLogicModel.load repositoryBusinessLogicModel: " + this.repositoryBusinessLogicModel);
        if(this.repositoryBusinessLogicModel) {
            //TODO
        }

    }
}

export interface IRepositoryBusinessLogicModel {

    navigateTo(element: RepositoryNavigationAction): void;

    updateDefaultEvent():void

    getMetaData(): IRepositoryMetaData;

    setMetaData(metaData: IRepositoryMetaData): void;

}

export class RepositoryBusinessLogicModel implements IRepositoryBusinessLogicModel {
    
    private currentEventPosition: number = -1;
    private countEvents: number = 0;
    private pageSize: number = 10;
    

    constructor(private logger: Logger, private timeSeriesDB: ITimeSeriesDB = new TimeSeriesDB()) {
    }

    navigateTo(element: RepositoryNavigationAction): void {
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo before element: " + RepositoryNavigationAction[element] 
            + " currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if(this.currentEventPosition  == -1){
                    this.currentEventPosition = this.countEvents - this.pageSize;
                }else{
                    this.currentEventPosition = this.currentEventPosition - this.pageSize;   
                }             
                break
            case RepositoryNavigationAction.PREVIOUS:
                if(this.currentEventPosition  == -1){
                    this.currentEventPosition = this.countEvents;
                }else{
                    this.currentEventPosition = this.currentEventPosition - 1;
                }
                
                break
            case RepositoryNavigationAction.NEXT:
                this.currentEventPosition = this.currentEventPosition + 1;
                break
            case RepositoryNavigationAction.NEXT_PAGE:
                this.currentEventPosition = this.currentEventPosition + this.pageSize;
                break
            case RepositoryNavigationAction.LAST:  
                this.currentEventPosition = this.countEvents;
                break
            default: // equal RepositoryNavigationAction.NEW
                this.currentEventPosition = -1;
                this.updateDefaultEvent();
        }
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo after currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );
        if(this.currentEventPosition < -1){
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is less than -1");
        }

        if(this.currentEventPosition > this.countEvents){
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is bigger than countEvents");
        }
       
    }

    updateDefaultEvent():void {
        this.logger.debug("RepositoryBusinessLogicModel.updateDefaultEvent before currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );
    }

    getMetaData(): IRepositoryMetaData {
        this.logger.debug("RepositoryBusinessLogicModel.getMetaData this.repositoryMetaDataDB currentEventPosition: " 
        + this.currentEventPosition + " countEvents: " + this.countEvents );
    
        return {currentEventPosition: this.currentEventPosition, countEvents: this.countEvents, pageSize: this.pageSize};
    }

    setMetaData(metaData: IRepositoryMetaData): void {
        this.currentEventPosition = metaData.currentEventPosition;
        this.countEvents = metaData.countEvents;
        this.pageSize = metaData.pageSize;
    
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