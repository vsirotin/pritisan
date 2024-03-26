import { Logger } from "../../../../../../shared/services/logging/logger";
import { IMetaDataPersistence } from "../../../../../../shared/classes/db/time-series-db";
import { IRepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { RepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { IRunningEventsBusinessLogicModel } from "./running-events-business-logic-model";
import { ICurrentEventBusinessLogicModel } from "./current-event-business-logic-model";


export interface ICaptureBusinessLogicModel {
    load(): unknown;
    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel: ICurrentEventBusinessLogicModel;
}

export class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    repositoryBusinessLogicModel!: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel!: ICurrentEventBusinessLogicModel;
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



