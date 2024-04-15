
import { Logger } from '../../../../../../shared/services/logging/logger';
import { CaptureBusinessLogicModel, 
    ICaptureBusinessLogicModel} from '../business-logic-model/capture-business-logic-model';
import { IRunningEventsBusinessLogicModel } from "../business-logic-model/running-events-business-logic-model";
import { EventTypeSelectingUIModel } from "./event-type-selecting-ui-model";
import { IRepositoryNavigationUIModel } from './repository-navigation-ui-model';
import { IRunningEventsUIModel } from './running-events-ui-model';


// UI model for the capture component
export interface ICaptureUIModel {
    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void;

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void;

    setRunningEventsUIModel(runningEventsUIModel: IRunningEventsUIModel): void;
    
    setCurrentEventUIModel(currentEventUIModel: EventUIModel): void;

} 

export class CaptureUIModel implements ICaptureUIModel {

    private captureBusinessLogicModel!: ICaptureBusinessLogicModel;

    private repositorNavigationUIModel!: IRepositoryNavigationUIModel;
    private runningEventsUIModel!:  IRunningEventsUIModel;
    private currentEventUIModel!: EventUIModel;

    constructor(private logger: Logger) {
        this.captureBusinessLogicModel = new CaptureBusinessLogicModel(this.logger)
    }

    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void {
        this.captureBusinessLogicModel = captureBusinessLogicModel;
    }

    setRunningEventsUIModel(runningEventsUIModel: IRunningEventsUIModel): void {
        this.runningEventsUIModel = runningEventsUIModel;
    }

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void {
        this.repositorNavigationUIModel = repositoryNavigationUIModel;
    }

    setCurrentEventUIModel(currentEventUIModel: EventUIModel): void {
        this.currentEventUIModel = currentEventUIModel;
    }

}

//------------Current event ui model -----------------


export class EventUIModel {

    eventSelectionUIModel!: EventTypeSelectingUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) {}
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

