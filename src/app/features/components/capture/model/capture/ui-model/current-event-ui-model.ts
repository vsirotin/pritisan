import { TimeSettingUIModel, ParametersSettingUIModel } from './capture-ui-model';

import { Subject, Subscription } from "rxjs";
import { Logger } from "../../../../../../shared/services/logging/logger";
import { CaptureNotificationService } from "../../../capture-notification-service";
import { IRunningEventsBusinessLogicModel } from "../business-logic-model/running-events-business-logic-model";
import { EventTypeSelectingUIModel } from "./event-type-selecting-ui-model";

export enum CurrentEventActions {
    FIRST_STEP,
    PREVIOUS_STEP,
    NEXT_STEP,
    SAVE,
    CANCEL,
    DELETE
}
//------------Current event ui model -----------------

export class CurrentEventProcessingUIModel {

    eventSelectionUIModel!: EventTypeSelectingUIModel;
    timeSettingUIModel!: TimeSettingUIModel;
    parametersSettingUIModel!: ParametersSettingUIModel;
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";

    private eventDescription = "";

    private eventDescriprionSubject = new Subject<string>();

    eventDescriptionChange$ = this.eventDescriprionSubject.asObservable();

    private subscription!: Subscription;

    constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
        this.subscription = this.captureNotificationService.captureNotification$.subscribe((eventType) => {
            this.eventDescriprionSubject.next(eventType);
        });
    }

    loadFrom(currentEventModel: IRunningEventsBusinessLogicModel) { }

    navigateTo(action: CurrentEventActions): string {
        return 'activity_type_selecting'; //TODO: implement navigation
    }

    doDestroy() {
        this.subscription.unsubscribe();
    }
}


