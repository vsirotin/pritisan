
//------------Repository Navigation model----------------
// Presentation model for the presenting data in UI

import { Logger } from "../../../../shared/services/logging/logger";
import { RepositoryNavigationAction } from "../business-logic-model/repository-navigation-business-logic-model";
import { NEW_EVENT_POSITION } from "../business-logic-model/repository-navigation-business-logic-model";
import { RepositoryBusinessLogicModel } from "../business-logic-model/repository-navigation-business-logic-model";
import { IRepositoryBusinessLogicModel } from "../business-logic-model/repository-navigation-business-logic-model";
import { IRepositoryMetaData } from "../capture-common-interfaces";


export interface IRepositoryNavigationPresenter {
    setRepositoryMetaData(count: number, currentEventPosition: number): void;
}// Input model for the navigation for processing the user actions

export interface IRepositoryNavigationInputModel {
    navigateTo(element: RepositoryNavigationAction): void;
}
// Query model for the providing data to the UI

export interface IRepositoryNavigationUIQueryModell {
    getRepositoryMetaData(): Promise<IRepositoryMetaData>
}
//Model for update data from the business logic model

export interface IRepositoryNavigationUpdateModel {
    updateRepositoryData(countEventsInRepository: number, currentEventPosition: number): void;
    updatePageSize(pageSize: number): void;
}
export interface IRepositoryNavigationUIModel extends IRepositoryNavigationInputModel, IRepositoryNavigationUIQueryModell, IRepositoryNavigationUpdateModel {
    setRepositoryNavigationBusinessLogicModel(repositoryNavigationBusinessLogicModel: IRepositoryBusinessLogicModel): Promise<void>;
    getRepositoryNavigationBusinessLogicModel(): IRepositoryBusinessLogicModel;

    isDisabled(element: RepositoryNavigationAction): boolean;
    setPresenter(presenter: IRepositoryNavigationPresenter): void;
}
// UI model for events/events saved in the repository

export class RepositoryNavigationUIModel implements IRepositoryNavigationUIModel {

    //Model for the business logic and master for data holding
    private repositoryNavigationBusinessLogicModel!: IRepositoryBusinessLogicModel;

    //Presenter for the UI (component)
    private presenter!: IRepositoryNavigationPresenter;

    // Count events in the repository
    private countEventsInRepository!: number;

    // Position of current event in the repository
    private currentEventPosition!: number;

    //Page size by navigation
    private pageSize!: number;

    constructor(private logger: Logger) {
        this.logger.debug("RepositoryNavigationUIModel.constructor");
        this.repositoryNavigationBusinessLogicModel = new RepositoryBusinessLogicModel(this.logger);
    }

    async setRepositoryNavigationBusinessLogicModel(repositoryNavigationBusinessLogicModel: IRepositoryBusinessLogicModel): Promise<void> {
        this.logger.debug("RepositoryNavigationUIModel.setRepositoryNavigationBusinessLogicModel start ");
        this.repositoryNavigationBusinessLogicModel = repositoryNavigationBusinessLogicModel;
        await this.updateDataFromBusinessModel();
        this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
    }

    getRepositoryNavigationBusinessLogicModel(): IRepositoryBusinessLogicModel {
        return this.repositoryNavigationBusinessLogicModel;
    }

    setPresenter(presenter: IRepositoryNavigationPresenter): void {
        this.presenter = presenter;
    }

    private async updateDataFromBusinessModel() {
        this.logger.debug("RepositoryNavigationUIModel.updateDataFromBusinessModel start countEvents: "
            + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize);

        const result = await this.repositoryNavigationBusinessLogicModel.getMetaData();
        this.countEventsInRepository = result.countEvents;
        this.currentEventPosition = result.currentEventPosition;
        this.pageSize = result.pageSize;
        this.logger.debug("RepositoryNavigationUIModel.updateDataFromBusinessModel fin countEvents: "
        + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize);
        
    }


    async navigateTo(element: RepositoryNavigationAction) {
        console.log("RepositoryNavigationUIModel.navigateTo element: ", RepositoryNavigationAction[element]);

        if (this.repositoryNavigationBusinessLogicModel) {
            this.repositoryNavigationBusinessLogicModel.navigateTo(element);
            await this.updateDataFromBusinessModel();
        } else {
            throw new Error("RepositoryNavigationBehaviorModel.repositoryNavigationBusinessLogicModel is not initialized");
        }

        if (this.presenter) {
            this.presenter.setRepositoryMetaData(this.countEventsInRepository, this.currentEventPosition);
        } else {
            throw new Error("RepositoryNavigationBehaviorModel.presenter is not initialized");
        }
    }

    isDisabled(element: RepositoryNavigationAction): boolean {
        this.logger.debug("RepositoryNavigationUIModel.isDisabled element: " + RepositoryNavigationAction[element]
            + " this.currentEventPosition: " + this.currentEventPosition + " this.countEventsInRepository: "
            + this.countEventsInRepository + " this.pageSize: " + this.pageSize);

        //Ordering: 1, 2, ...N. Last inserte has position N. New has position NEW_EVENT_PODITION. First (oldest) inserted event has position 1 
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if (this.currentEventPosition == NEW_EVENT_POSITION) {
                    return !(this.countEventsInRepository > this.pageSize);
                }
                return !(this.currentEventPosition > this.pageSize);
            case RepositoryNavigationAction.PREVIOUS:
                if (this.currentEventPosition == NEW_EVENT_POSITION) {
                    return !(this.countEventsInRepository > 0);
                }
                return !(this.currentEventPosition > 1);
            case RepositoryNavigationAction.NEXT:
                if ((this.currentEventPosition == NEW_EVENT_POSITION) || (this.currentEventPosition == this.countEventsInRepository)) {
                    return true;
                }
                return !(this.currentEventPosition > 0);
            case RepositoryNavigationAction.NEXT_PAGE:
                if ((this.currentEventPosition == NEW_EVENT_POSITION) || (this.currentEventPosition == this.countEventsInRepository)) {
                    return true;
                }
                return !(this.countEventsInRepository - this.currentEventPosition > this.pageSize);
            case RepositoryNavigationAction.LAST:
                if ((this.currentEventPosition == NEW_EVENT_POSITION) || (this.currentEventPosition == this.countEventsInRepository)) {
                    return true;
                }
                return (this.countEventsInRepository == 0);
            default: // equal RepositoryNavigationAction.NEW
                return false;
        }
    }

    async getRepositoryMetaData(): Promise<IRepositoryMetaData> {
        this.logger.debug("RepositoryNavigationUIModel.getRepositoryMetaData countEventsInRepository: " + this.countEventsInRepository 
            + " currentEventPosition: " + this.currentEventPosition);
        
        if (this.countEventsInRepository == undefined || this.currentEventPosition == undefined) {
                const result = await this.repositoryNavigationBusinessLogicModel.getMetaData()
                this.countEventsInRepository = result.countEvents;
                this.currentEventPosition = result.currentEventPosition;
                this.pageSize = result.pageSize;
                this.logger.debug("RepositoryNavigationUIModel.getRepositoryMetaData in then() countEvents: "
                + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize);

        }

        this.logger.debug("RepositoryNavigationUIModel.getRepositoryMetaData 2 countEvents: "
                + this.countEventsInRepository + " currentEventPosition: " + this.currentEventPosition + " pageSize: " + this.pageSize);
        return { countEvents: this.countEventsInRepository, currentEventPosition: this.currentEventPosition };
        
    }

    updateRepositoryData(countEventsInRepository: number, currentEventPosition: number): void {
        this.logger.debug("RepositoryNavigationUIModel.updateRepositoryData countEventsInRepository: " + countEventsInRepository + " currentEventPosition: " + currentEventPosition);
        this.countEventsInRepository = countEventsInRepository;
        this.currentEventPosition = currentEventPosition;
    }
    updatePageSize(pageSize: number): void {
        this.logger.debug("RepositoryNavigationUIModel.updatePageSize pageSize: " + pageSize);
        this.pageSize = pageSize;
    }
}

