
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
//import { CaptureBusinessLogicModelFactory} from '../business-logic-model/capture-business-logic-model';
import { ICaptureBusinessLogicModel } from "../capture-common-interfaces";
import { IRepositoryNavigationUIModel } from './repository-navigation-ui-model';
import { IRunningEventsUIModel } from './running-events-ui-model';
import { ICurrentEventProcessingUIModel } from './current-event-processing-ui-model/current-event-processing-ui-model';


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
    private currentEventUIModel!: ICurrentEventProcessingUIModel;

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CaptureUIModel");
    
    constructor() {
 //       this.captureBusinessLogicModel = CaptureBusinessLogicModelFactory.createOrGetModel()
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

    setCurrentEventUIModel(currentEventUIModel: ICurrentEventProcessingUIModel): void {
        this.currentEventUIModel = currentEventUIModel;
    }

}

// export class TimeSettingUIModel {
//     startTime: TimePointSettingUIModel = new TimePointSettingUIModel();
//     finishTime?: TimePointSettingUIModel;
// }  

class TimePointSettingUIModel {
    time: Date = new Date();
    role!: string;
    error?: string;
} 

export class ParametersSettingUIModel {}

