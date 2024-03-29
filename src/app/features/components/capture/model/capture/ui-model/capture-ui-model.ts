import { IMetaDataPersistence, MetaDataPersistence } from '../../../../../../shared/classes/db/time-series-db';
import { Logger } from '../../../../../../shared/services/logging/logger';
import { CaptureBusinessLogicModel, 
    ICaptureBusinessLogicModel} from '../business-logic-model/capture-business-logic-model';
import { IRunningEventsBusinessLogicModel } from "../business-logic-model/running-events-business-logic-model";
import { IRepositoryMetaDataExt } from "../capture-common-interfaces";
import { IRepositoryNavigationUIModel } from './repository-navigation-ui-model';
import { IRunningEventsUIModel, RunningEventsUIModel } from './running-events-ui-model';


// UI model for the capture component
export interface ICaptureUIModel {
    setCaptureBusinessLogicModel(captureBusinessLogicModel: ICaptureBusinessLogicModel): void;

    setNavigationUIModel(repositoryNavigationUIModel: IRepositoryNavigationUIModel): void;

    setRunningEventsUIModel(runningEventsUIModel: IRunningEventsUIModel): void;
    
    setCurrentEventUIModel(currentEventUIModel: EventUIModel): void;

    init(): void;

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

    init() {

        // this.captureBusinessLogicModel.load(); 
        // this.runningEventsUIModel.loadFrom(this.captureBusinessLogicModel.runningEventsBusinessLogicModel);
        // this.currentEventUIModel.loadFrom(this.captureBusinessLogicModel.currentEventBusinessLogicModel);
    }

}

//------------Current event ui model -----------------


export class EventUIModel {

    eventSelectionUIModel!: EventTypeSelectingPresenationModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) {}
}

export class EventTypeSelectingPresenationModel {
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

