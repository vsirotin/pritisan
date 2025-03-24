import { ICaptureBusinessLogicModel, IEvent } from "../capture-common-interfaces";
import { Observable, Subject } from "rxjs";
import { IPersistedEvent } from "../../../../shared/classes/db/time-series-db";
import { IMetaDataPersistence, MetaDataPersistence } from "../../../../shared/classes/db/metadata-db";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IRepositoryMetaDataExt } from "../capture-common-interfaces";
import { encodePersistedEvent } from "./current-event-business-logic-model/event-commons";

interface IRepositoryBusinessLogicModelInput {
    navigateTo(element: RepositoryNavigationAction): void;
}
interface IRepositoryBusinessLogicModelQuery {
    getMetaData(): Promise<IRepositoryMetaDataExt>;
}

interface IRepositoryBusinessLogicModelNotificator {
    currentEventIdChanged$: Observable<IEvent>;
}


export interface IRepositoryBusinessLogicModel extends IRepositoryBusinessLogicModelInput, 
    IRepositoryBusinessLogicModelQuery, 
    IRepositoryBusinessLogicModelNotificator  {
  metaDataDB: IMetaDataPersistence;
}

export class RepositoryBusinessLogicModel implements IRepositoryBusinessLogicModel {

    private currentEventPosition!: number;
    private countEvents!: number;
    private pageSize!: number;
    metaDataDB!: IMetaDataPersistence;

    private subjectCurrentEventId = new Subject<IEvent>();
    currentEventIdChanged$!: Observable<IEvent>;

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.RepositoryBusinessLogicModel");

    constructor(private parent: ICaptureBusinessLogicModel) {
        this.metaDataDB = new MetaDataPersistence();
        this.currentEventIdChanged$ = this.subjectCurrentEventId.asObservable();
    }

    navigateTo(element: RepositoryNavigationAction): void {
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo before element: " + RepositoryNavigationAction[element]
            + " currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents);

        //Ordering: 1, 2, ...N. Last inserte has position N. New has position NEW_EVENT_PODITION. First (oldest) inserted event has position 1    
        switch (element) {
            case RepositoryNavigationAction.PREVIOUS_PAGE:
                if (this.currentEventPosition == NEW_EVENT_POSITION) {
                    this.currentEventPosition = this.countEvents - this.pageSize;
                } else {
                    this.currentEventPosition = this.currentEventPosition - this.pageSize;
                }
                break;
            case RepositoryNavigationAction.PREVIOUS:
                if (this.currentEventPosition == NEW_EVENT_POSITION) {
                    this.currentEventPosition = this.countEvents;
                } else {
                    this.currentEventPosition = this.currentEventPosition - 1;
                }
                break;
            case RepositoryNavigationAction.NEXT:
                this.currentEventPosition = this.currentEventPosition + 1;
                break;
            case RepositoryNavigationAction.NEXT_PAGE:
                this.currentEventPosition = this.currentEventPosition + this.pageSize;
                break;
            case RepositoryNavigationAction.LAST:
                this.currentEventPosition = this.countEvents;
                break;
            default: // equal RepositoryNavigationAction.NEW
                this.currentEventPosition = NEW_EVENT_POSITION;
        }
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo after currentEventPosition: " + this.currentEventPosition + " countEvents: " + this.countEvents);
        if (this.currentEventPosition < NEW_EVENT_POSITION) {
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is less than NEW_EVENT_PODITION");
        }

        if (this.currentEventPosition > this.countEvents) {
            throw new Error("RepositoryBusinessLogicModel.navigateTo currentEventPosition is bigger than countEvents");
        }

        //Inform about change of current event
        let savedEvent = this.metaDataDB.readEvent(this.currentEventPosition);
        let event: IEvent = this.convertToEvent(savedEvent);
        this.logger.debug("RepositoryBusinessLogicModel.navigateTo new current event: " + JSON.stringify(event));
        this.subjectCurrentEventId.next(event);

    }

    convertToEvent(savedEvent: IPersistedEvent): IEvent {
        this.logger.debug("RepositoryBusinessLogicModel.convertToEvent savedEvent: " + JSON.stringify(savedEvent));
        this.logger.warn("RepositoryBusinessLogicModel.convertToEvent. Temporary solution. It should be replaced by real data from DB ");
        return encodePersistedEvent(savedEvent);
    }

    async getMetaData(): Promise<IRepositoryMetaDataExt> {
        this.logger.debug("RepositoryBusinessLogicModel.getMetaData start this.repositoryMetaDataDB currentEventPosition: "
            + this.currentEventPosition + " countEvents: " + this.countEvents);

        if (this.currentEventPosition == undefined || this.countEvents == undefined || this.pageSize == undefined) {
            const metaData = await this.metaDataDB.readMetaData();
            this.currentEventPosition = metaData.currentEventPosition;
            this.countEvents = metaData.countEvents;
            this.pageSize = metaData.pageSize;
            this.logger.debug("RepositoryBusinessLogicModel.getMetaData metaData: " + JSON.stringify(metaData));         
        }
        this.logger.debug("RepositoryBusinessLogicModel.getMetaData fin this.repositoryMetaDataDB currentEventPosition: "
            + this.currentEventPosition + " countEvents: " + this.countEvents);

        return { currentEventPosition: this.currentEventPosition, 
                countEvents: this.countEvents, pageSize: this.pageSize };
    };
}

export const NEW_EVENT_POSITION = -1;

export enum RepositoryNavigationAction {
    PREVIOUS_PAGE,
    PREVIOUS,
    NEXT,
    NEXT_PAGE,
    LAST,
    NEW
}
