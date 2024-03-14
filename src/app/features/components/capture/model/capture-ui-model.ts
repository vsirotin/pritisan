import { CaptureBusinessLogicModel, 
    ICaptureBusinessLogicModel, 
    IRepositoryBusinessLogicModel,
    IRunningEventsBusinessLogicModel } from './capture-business-logic-model';


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
    navigateTo(where: string): void;
}

export interface IRepositoryNavigationUIModel extends IRepositoryNavigationInputModel, IRepositoryPresentationModel {
    setPresenter(presenter: IRepositoryPresentationModel): void;
    loadFrom(repositoryModel: IRepositoryBusinessLogicModel): void;
}

// UI model for events/events saved in the repository
export class RepositoryNavigationUIModel  implements IRepositoryNavigationUIModel{

    repositoryNavigationBehaviorModel!: IRepositoryBusinessLogicModel;

    // Count events in the repository
    private countEventsInRepository: number = 9; //TODO

    // Position of current event in the repository
    private currentEventPosition: number = 23; //TODO



    private presenter!: IRepositoryPresentationModel;

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

 
    navigateTo(where: string) {
        console.log("RepositoryNavigationUIModel.navigateTo presenter: ", this.presenter);
        if (this.presenter) {
            this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
        }

        // if (this.repositoryNavigationBehaviorModel) {
        //     this.repositoryNavigationBehaviorModel.navigateTo(where);
        // }else {
        //     throw new Error("RepositoryNavigationBehaviorModel is not initialized");
        // }
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

