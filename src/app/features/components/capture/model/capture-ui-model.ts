import { CaptureBusinessLogicModel, 
    ICaptureBusinessLogicModel, 
    IRepositoryBusinessLogicModel,
    IRunningEventsBusinessLogicModel, 
    RepositoryNavigationAction} from './capture-business-logic-model';


// UI model for the capture component
export class CaptureUIModel {


    captureBusinessLogicModel!: ICaptureBusinessLogicModel;

    navigationUIModel!: IRepositoryNavigationUIModel;
    runningEventsUIModel!:  RunningEventsUIModel;
    currentEventUIModel!: EventUIModel;

    init() {
        this.captureBusinessLogicModel = new CaptureBusinessLogicModel()
        this.captureBusinessLogicModel.load(); 
        this.navigationUIModel.loadFrom(this.captureBusinessLogicModel.repositoryBusinessLogicModel);
        this.runningEventsUIModel.loadFrom(this.captureBusinessLogicModel.runningEventsBusinessLogicModel);
        this.currentEventUIModel.loadFrom(this.captureBusinessLogicModel.currentEventBusinessLogicModel);
    }

}

//------------Repository Navigation model----------------
export interface IRepositoryPresentationModel {
    setRepositoryMetaData(count: number, currentEventPosition: number): void;
}

export interface IRepositoryNavigationInputModel {
    navigateTo(element: RepositoryNavigationAction): void;
}

export interface IRepositoryNavigationUIModel extends IRepositoryNavigationInputModel, IRepositoryPresentationModel {
    repositoryNavigationBusinessLogicModel: IRepositoryBusinessLogicModel;
    isDisabled(element: RepositoryNavigationAction): boolean;
    setPresenter(presenter: IRepositoryPresentationModel): void;
    loadFrom(repositoryModel: IRepositoryBusinessLogicModel): void;
}

// UI model for events/events saved in the repository
export class RepositoryNavigationUIModel  implements IRepositoryNavigationUIModel{

    repositoryNavigationBusinessLogicModel!: IRepositoryBusinessLogicModel;

    // Count events in the repository
    private countEventsInRepository: number = -1; 

    // Position of current event in the repository
    private currentEventPosition: number = 0; 

    private presenter!: IRepositoryPresentationModel;

    private pageSize = 10;

    setPresenter(presenter: IRepositoryPresentationModel): void {
        this.presenter = presenter;
    }
    setRepositoryMetaData(count: number, currentEventPosition: number): void {
        throw new Error('Method not implemented.');
    }

    loadFrom(repositoryModel: IRepositoryBusinessLogicModel) {
        this.countEventsInRepository = repositoryModel.countEvents;
        this.currentEventPosition = repositoryModel.currentEventPosition;
    }

 
    navigateTo(element: RepositoryNavigationAction) {
        console.log("RepositoryNavigationUIModel.navigateTo presenter: ", this.presenter, " element: ", element);
        if (this.presenter) {
            this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
        }

        if(this.repositoryNavigationBusinessLogicModel) {
            this.repositoryNavigationBusinessLogicModel.navigateTo(element);
        }else {
            throw new Error("RepositoryNavigationBehaviorModel is not initialized");
        }
    }

    isDisabled(element: RepositoryNavigationAction): boolean {
        console.log("RepositoryNavigationUIModel.isDisabled element: ", element, 
        " countEventsInRepository: ", this.countEventsInRepository, 
        " currentEventPosition: ", this.currentEventPosition, 
        " pageSize: ", this.pageSize);

        //Calcualtion in (...) done for positive (available) to better readability
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if(this.currentEventPosition = -1){
                    return !(this.countEventsInRepository > this.pageSize);
                } 
                return !(this.countEventsInRepository - this.currentEventPosition >= this.pageSize);
            case RepositoryNavigationAction.PREVIOUS:
                if(this.currentEventPosition = -1){
                    return !(this.countEventsInRepository > 0);
                } 
                return !(this.countEventsInRepository - this.currentEventPosition > 0);
            case RepositoryNavigationAction.NEXT:
                 return !(this.currentEventPosition > 0); 
            case RepositoryNavigationAction.NEXT_PAGE:
                return !(this.currentEventPosition > this.pageSize);
            case RepositoryNavigationAction.LAST:  
                return !(this.currentEventPosition > 0);   
            default: // equal RepositoryNavigationAction.NEW
                return false;
        }
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

