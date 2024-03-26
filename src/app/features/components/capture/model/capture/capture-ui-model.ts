import { IMetaDataPersistence, MetaDataPersistence } from '../../../../../shared/classes/db/time-series-db';
import { Logger } from '../../../../../shared/services/logging/logger';
import { CaptureBusinessLogicModel, 
    ICaptureBusinessLogicModel, 
    IRepositoryBusinessLogicModel,
    IRunningEventsBusinessLogicModel, 
    NEW_EVENT_PODITION, 
    RepositoryBusinessLogicModel, 
    RepositoryNavigationAction} from './capture-business-logic-model';
import { IRepositoryMetaData } from './capture-model-interfaces';


// UI model for the capture component
export interface ICaptureUIModel {
    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void;

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void;

    setRunningEventsUIModel(runningEventsUIModel: RunningEventsUIModel): void;
    
    setCurrentEventUIModel(currentEventUIModel: EventUIModel): void;

    init(): void;

} 

export class CaptureUIModel implements ICaptureUIModel {

    private captureBusinessLogicModel!: ICaptureBusinessLogicModel;

    private repositorNavigationUIModel!: IRepositoryNavigationUIModel;
    private runningEventsUIModel!:  RunningEventsUIModel;
    private currentEventUIModel!: EventUIModel;

    constructor(private logger: Logger) {
        this.captureBusinessLogicModel = new CaptureBusinessLogicModel(this.logger)
    }

    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void {
        this.captureBusinessLogicModel = captureBusinessLogicModel;
    }

    setRunningEventsUIModel(runningEventsUIModel: RunningEventsUIModel): void {
        this.runningEventsUIModel = runningEventsUIModel;
    }

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void {
        this.repositorNavigationUIModel = repositoryNavigationUIModel;
    }

    setCurrentEventUIModel(currentEventUIModel: EventUIModel): void {
        this.currentEventUIModel = currentEventUIModel;
    }

    init() {

        this.captureBusinessLogicModel.load(); 
        this.runningEventsUIModel.loadFrom(this.captureBusinessLogicModel.runningEventsBusinessLogicModel);
        this.currentEventUIModel.loadFrom(this.captureBusinessLogicModel.currentEventBusinessLogicModel);
    }

}

//------------Repository Navigation model----------------

// Presentation model for the presenting data in UI
export interface IRepositoryPresentationModel {
    setRepositoryMetaData(count: number, currentEventPosition: number): void;
}

// Input model for the navigation for processing the user actions
export interface IRepositoryNavigationInputModel {
    navigateTo(element: RepositoryNavigationAction): void;
}

// Query model for the providing data to the UI
export interface IRepositoryNavigationUIQueryModell  {
    getRepositoryMetaData(): {count: number, currentEventPosition: number};
}

//Model for update data from the business logic model
export interface IRepositoryNavigartionUpdateModel {
    updateRepositoryData(countEventsInRepository: number, currentEventPosition: number): void; 
    updatePageSize(pageSize: number): void;
}

export interface IRepositoryNavigationUIModel extends IRepositoryNavigationInputModel, IRepositoryNavigationUIQueryModell, IRepositoryNavigartionUpdateModel {
    setRepositoryNavigationBusinessLogicModel(repositoryNavigationBusinessLogicModel: IRepositoryBusinessLogicModel): void;
    getRepositoryNavigationBusinessLogicModel() : IRepositoryBusinessLogicModel;

    isDisabled(element: RepositoryNavigationAction): boolean;
    setPresenter(presenter: IRepositoryPresentationModel): void;
    updateDataFromBusinessModel(): void;
}

// UI model for events/events saved in the repository
export class RepositoryNavigationUIModel  implements IRepositoryNavigationUIModel{
 
    //Model for the business logic and master for data holding
    private repositoryNavigationBusinessLogicModel!: IRepositoryBusinessLogicModel;

    //Presenter for the UI (component)
    private presenter!: IRepositoryPresentationModel;

    // Count events in the repository
    private countEventsInRepository!: number; 

    // Position of current event in the repository
    private currentEventPosition!: number; 

    //Page size by navigation
    private pageSize!: number;

    constructor(private logger: Logger) {
        this.logger.debug("RepositoryNavigationUIModel.constructor");
        this.repositoryNavigationBusinessLogicModel = new RepositoryBusinessLogicModel(this.logger);
    }

    setRepositoryNavigationBusinessLogicModel(repositoryNavigationBusinessLogicModel: IRepositoryBusinessLogicModel) {
        this.logger.debug("RepositoryNavigationUIModel.setRepositoryNavigationBusinessLogicModel start ");
        this.repositoryNavigationBusinessLogicModel = repositoryNavigationBusinessLogicModel;
        this.updateDataFromBusinessModel();
        this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
    }

    getRepositoryNavigationBusinessLogicModel() : IRepositoryBusinessLogicModel {
        return this.repositoryNavigationBusinessLogicModel;
    }

    setPresenter(presenter: IRepositoryPresentationModel): void {
        this.presenter = presenter;
    }

    updateDataFromBusinessModel() {
        this.logger.debug("RepositoryNavigationUIModel.updateDataFromBusinessModel start countEvents: " 
            + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize );

            
        let result = this.repositoryNavigationBusinessLogicModel.getMetaData();
    
        this.countEventsInRepository = result.countEvents;
        this.currentEventPosition = result.currentEventPosition;
        this.pageSize = result.pageSize;
        
        this.logger.debug("RepositoryNavigationUIModel.updateDataFromBusinessModel fin countEvents: " 
            + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize );
    }

 
    navigateTo(element: RepositoryNavigationAction) {
        console.log("RepositoryNavigationUIModel.navigateTo element: ", RepositoryNavigationAction[element] );

        if(this.repositoryNavigationBusinessLogicModel) {
            this.repositoryNavigationBusinessLogicModel.navigateTo(element);
            this.updateDataFromBusinessModel()
        }else {
            throw new Error("RepositoryNavigationBehaviorModel.repositoryNavigationBusinessLogicModel is not initialized");
        }

        if (this.presenter) {
            this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
        }else {
            throw new Error("RepositoryNavigationBehaviorModel.presenter is not initialized");
        }
    }

    isDisabled(element: RepositoryNavigationAction): boolean {
        this.logger.debug("RepositoryNavigationUIModel.isDisabled element: " + RepositoryNavigationAction[element] 
        + " this.currentEventPosition: " + this.currentEventPosition + " this.countEventsInRepository: " 
        + this.countEventsInRepository + " this.pageSize: " + this.pageSize);

        //Ordering: 1, 2, ...N. Last inserte has position N. New has position NEW_EVENT_PODITION. First (oldest) inserted event has position 1 
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if(this.currentEventPosition == NEW_EVENT_PODITION){
                    return !(this.countEventsInRepository > this.pageSize);
                } 
                return !(this.currentEventPosition > this.pageSize);
            case RepositoryNavigationAction.PREVIOUS:
                if(this.currentEventPosition == NEW_EVENT_PODITION){
                    return !(this.countEventsInRepository > 0);
                } 
                return !(this.currentEventPosition > 1);
            case RepositoryNavigationAction.NEXT:
                if((this.currentEventPosition == NEW_EVENT_PODITION) || (this.currentEventPosition == this.countEventsInRepository)){
                    return true;
                } 
                return !(this.currentEventPosition > 0);
            case RepositoryNavigationAction.NEXT_PAGE:
                if((this.currentEventPosition == NEW_EVENT_PODITION) || (this.currentEventPosition == this.countEventsInRepository)){
                    return true;
                } 
                return !(this.countEventsInRepository - this.currentEventPosition > this.pageSize);
            case RepositoryNavigationAction.LAST:  
                if((this.currentEventPosition == NEW_EVENT_PODITION) || (this.currentEventPosition == this.countEventsInRepository)){
                    return true;
                }
                return (this.countEventsInRepository == 0);   
            default: // equal RepositoryNavigationAction.NEW
                return false;
        }
    }

    getRepositoryMetaData(): { count: number; currentEventPosition: number; } {
        if(this.countEventsInRepository == undefined || this.currentEventPosition == undefined) {
            this.updateDataFromBusinessModel();
        }
        this.logger.debug("RepositoryNavigationUIModel.getRepositoryMetaData countEventsInRepository: " + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition);
        return {count: this.countEventsInRepository, currentEventPosition: this.currentEventPosition};
    }

    updateRepositoryData(countEventsInRepository: number, currentEventPosition: number): void {
        this.logger.debug("RepositoryNavigationUIModel.updateRepositoryData countEventsInRepository: " + countEventsInRepository + " currentEventPosition: " + currentEventPosition);
        this.countEventsInRepository = countEventsInRepository;
        this.currentEventPosition = currentEventPosition;
    }
    updatePageSize(pageSize: number): void {
        this.logger.debug("RepositoryNavigationUIModel.updatePageSize pageSize: " + pageSize);
        this.pageSize = pageSize;
    }
}



//------------Running events ui model----------------


// UI model for events/events saved in the repository
export class RunningEventsUIModel  {
    
    // The list of runing events/events
    runningEvents: EventUIModel[] = [];

    loadFrom(runningEventsModel: IRunningEventsBusinessLogicModel) {}
}

//------------Current event ui model -----------------


export class EventUIModel {

    eventSelectionUIModel!: EventSelectionPresenationModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) {}
}

export class EventSelectionPresenationModel {
    eventSelection: string = "";
}

export class TimeSettingUIModel {
    startTime: TimePointSettingUIModel = new TimePointSettingUIModel();
    finishTime?: TimePointSettingUIModel;
}  

export class TimePointSettingUIModel {
    time: Date = new Date();
    role!: string;
    error?: string;
} 

export class ParametersSettingUIModel {}

