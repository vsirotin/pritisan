import { Logger } from "../../../../../shared/services/logging/logger";
import { IMetaDataPersistence, IPersistedEvent, MetaDataPersistence } from "../../../../../shared/classes/db/time-series-db";
import { IRepositoryMetaData } from "./capture-model-interfaces";
import { Observable, Subject } from "rxjs";


export interface ICaptureBusinessLogicModel {
    load(): unknown;
    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel: IEventBusinessLogicModel;
}

export class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    repositoryBusinessLogicModel!: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel!: IEventBusinessLogicModel;
    logger!: Logger;
    private timeSeriesDB!: IMetaDataPersistence;
    
    constructor(logger: Logger) {
        this.logger = logger;  
        this.repositoryBusinessLogicModel = new RepositoryBusinessLogicModel(logger);
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

    currentEventIdChanged$: Observable<IEvent>;

}

export class RepositoryBusinessLogicModel implements IRepositoryBusinessLogicModel {
    
    private currentEventPosition!: number;
    private countEvents!: number;
    private pageSize!: number;
    metaDataDB!: IMetaDataPersistence;

    private subjectCurrentEventId = new Subject<IEvent>();
    currentEventIdChanged$!: Observable<IEvent>;
    

    constructor(private logger: Logger) {
        this.metaDataDB = new MetaDataPersistence(logger)   
        this.currentEventIdChanged$ = this.subjectCurrentEventId.asObservable();
    }

    navigateTo(element: RepositoryNavigationAction): void {
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo before element: " + RepositoryNavigationAction[element] 
            + " currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );

        //Ordering: 1, 2, ...N. Last inserte has position N. New has position NEW_EVENT_PODITION. First (oldest) inserted event has position 1    
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if(this.currentEventPosition  == NEW_EVENT_PODITION){
                    this.currentEventPosition = this.countEvents - this.pageSize;
                }else{
                    this.currentEventPosition = this.currentEventPosition - this.pageSize;   
                }             
                break
            case RepositoryNavigationAction.PREVIOUS:
                if(this.currentEventPosition  == NEW_EVENT_PODITION){
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
                this.currentEventPosition = NEW_EVENT_PODITION;
        }
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo after currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );
        if(this.currentEventPosition < NEW_EVENT_PODITION){
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is less than NEW_EVENT_PODITION");
        }

        if(this.currentEventPosition > this.countEvents){
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is bigger than countEvents");
        }

        //Inform about change of current event
        let savedEvent = this.metaDataDB.readEvent(this.currentEventPosition);
        let event: IEvent = this.convertToEvent(savedEvent);
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo new current event: " + JSON.stringify(event));
        this.subjectCurrentEventId.next(event);
       
    }

    convertToEvent(savedEvent: IPersistedEvent): IEvent {
        this.logger.debug("RepositoryBusinessLogicModel.convertToEvent savedEvent: " + JSON.stringify(savedEvent));
        this.logger.warn("RepositoryBusinessLogicModel.convertToEvent. Temporary solution. It should be replaced by real data from DB ");
        return {duration: 9, start: "a", type: "t", details: "b"};
    }

    updateDefaultEvent():void {
        this.logger.debug("RepositoryBusinessLogicModel.updateDefaultEvent before currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents );
    }

    getMetaData(): IRepositoryMetaData {
        this.logger.debug("RepositoryBusinessLogicModel.getMetaData start this.repositoryMetaDataDB currentEventPosition: " 
        + this.currentEventPosition + " countEvents: " + this.countEvents );

        if(this.currentEventPosition == undefined || this.countEvents == undefined || this.pageSize == undefined){
            let metaData = this.metaDataDB.readMetaData();
            this.currentEventPosition = metaData.currentEventPosition;
            this.countEvents = metaData.countEvents;
            this.pageSize = metaData.pageSize;
            this.logger.debug("RepositoryBusinessLogicModel.getMetaData metaData: " + JSON.stringify(metaData));
        }
    
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

export interface IEvent {    
    duration: number;
    start: string;
    type: string;
    details: string;
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

export const NEW_EVENT_PODITION = -1;