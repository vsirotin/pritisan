import { Logger } from "../../../../shared/services/logging/logger";
import { IMetaDataPersistence } from "../../../../shared/classes/db/metadata-db";
import { IRepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { RepositoryBusinessLogicModel } from "./repository-navigation-business-logic-model";
import { IRunningEventsBusinessLogicModel } from "./running-events-business-logic-model";
import { CurrentEventProcessingBusinessLogicModel } from "./current-event-business-logic-model/current-event-business-logic-model";


export interface ICaptureBusinessLogicModel {
    load(): unknown;
    repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel: CurrentEventProcessingBusinessLogicModel;
}

export class CaptureBusinessLogicModel implements ICaptureBusinessLogicModel{

    repositoryBusinessLogicModel!: IRepositoryBusinessLogicModel;
    runningEventsBusinessLogicModel!: IRunningEventsBusinessLogicModel;
    currentEventBusinessLogicModel!: CurrentEventProcessingBusinessLogicModel;
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



