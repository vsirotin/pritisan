import { CaptureBehaviorModel, ICaptureBehaviorModel, IRepositoryNavigationBehaviorModel } from './capture-behavior-model';


// UI model for the capture component
export class CaptureUIModel {
    captureBehaviorModel: ICaptureBehaviorModel = new CaptureBehaviorModel();

    navigationUIModel = new NavigationUIModel();
    runningEventsUIModel = new RunningEventsUIModel();
    currentEventUIModel = new EventUIModel();

}

//------------Navigation model----------------


// UI model for events/events saved in the repository
export class NavigationUIModel  {

    // Count events in the repository
    countEventsInRepository: number = 0;

    // Position of current event in the repository
    currentEventPosition: string = "0";

    repositoryNavigationBehaviorModel?: IRepositoryNavigationBehaviorModel;

    navigateTo(where: string) {
        if (this.repositoryNavigationBehaviorModel) {
            this.repositoryNavigationBehaviorModel.navigateTo(where);
        }
    }
}

//------------Running events presentation model----------------


// UI model for events/events saved in the repository
export class RunningEventsUIModel  {
    
    // The list of runing events/events
    runningEvents: EventUIModel[] = [];

    isVisible: boolean = true;

    selectEvent(eventPositionInList: number) {}

    closeSelectedEvents() {}

    deletelectedEvents() {}
}

//------------Current event presentation model -----------------


export class EventUIModel {

    eventSelectionPresenationModel = new EventSelectionPresenationModel();
    timeSettingPresenationModel = new TimeSettingUIModel();
    parametersSettingUIModel = new ParametersSettingUIModel();
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";
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

