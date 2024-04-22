
import { Logger } from '../../../../shared/services/logging/logger';
import { CaptureBusinessLogicModelFactory} from '../business-logic-model/capture-business-logic-model';
import { ICaptureBusinessLogicModel } from "../capture-common-interfaces";
import { IRepositoryNavigationUIModel } from './repository-navigation-ui-model';
import { IRunningEventsUIModel } from './running-events-ui-model';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel } from './current-event-ui-model/current-event-processing-ui-model';


// UI model for the capture component
export interface ICaptureUIModel {
    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void;

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void;

    setRunningEventsUIModel(runningEventsUIModel: IRunningEventsUIModel): void;
    
    setCurrentEventUIModel(currentEventUIModel: ICurrentEventProcessingUIModel): void;

} 

export class CaptureUIModel implements ICaptureUIModel {

    private captureBusinessLogicModel!: ICaptureBusinessLogicModel;

    private repositorNavigationUIModel!: IRepositoryNavigationUIModel;
    private runningEventsUIModel!:  IRunningEventsUIModel;
    private currentEventUIModel!: CurrentEventProcessingUIModel;

    constructor(private logger: Logger) {
        this.captureBusinessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel(this.logger)
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

    setCurrentEventUIModel(currentEventUIModel: CurrentEventProcessingUIModel): void {
        this.currentEventUIModel = currentEventUIModel;
    }

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

