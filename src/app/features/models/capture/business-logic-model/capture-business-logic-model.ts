import { Logger } from "../../../../shared/services/logging/logger";
import { IMetaDataPersistence } from "../../../../shared/classes/db/metadata-db";
import { IRepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { RepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { IRunningEventsBusinessLogicModel, RunningEventsBusinessLogicModel } from "./running-events-business-logic-model";
import { CurrentEventProcessingBusinessLogicModel, ICurrentEventProcessingBusinessLogicModel } from "./current-event-business-logic-model/current-event-business-logic-model";
import { ICaptureBusinessLogicModel } from "../capture-common-interfaces";


class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    private repositoryBusinessLogicModel!: IRepositoryBusinessLogicModel;
    private runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    private currentEventBusinessLogicModel!: ICurrentEventProcessingBusinessLogicModel;
    private timeSeriesDB!: IMetaDataPersistence;
    
    constructor(private logger: Logger) {
        this.logger.debug("CaptureBusinessLogicModel.constructor");
    }
    getRepositoryBusinessLogicModel(): IRepositoryBusinessLogicModel {
        if(!this.repositoryBusinessLogicModel) {
            this.repositoryBusinessLogicModel = new RepositoryBusinessLogicModel(this.logger, this);
        }
        return this.repositoryBusinessLogicModel;
    }
    
    getRunningEventsBusinessLogicModel(): IRunningEventsBusinessLogicModel {
        if(!this.runningEventsBusinessLogicModel) {
            this.runningEventsBusinessLogicModel = new RunningEventsBusinessLogicModel(this.logger, this);
        }
        return this.runningEventsBusinessLogicModel;
    }
    
    getCurrentEventBusinessLogicModel(): ICurrentEventProcessingBusinessLogicModel {
        if(!this.currentEventBusinessLogicModel) {
            this.currentEventBusinessLogicModel = new CurrentEventProcessingBusinessLogicModel(this.logger, this);
        }
        return this.currentEventBusinessLogicModel;
    }
  
}

export class CaptureBusinessLogicModelFactory {
    private static instance: ICaptureBusinessLogicModel
    static createOrGetModel(logger: Logger): ICaptureBusinessLogicModel {
        if(!CaptureBusinessLogicModelFactory.instance) {
            CaptureBusinessLogicModelFactory.instance = new CaptureBusinessLogicModel(logger);
        }
        return CaptureBusinessLogicModelFactory.instance;
    }
}



