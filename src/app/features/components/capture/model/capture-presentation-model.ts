import { Inject, Injectable } from '@angular/core';
import { CaptureBehaviorModel, ICaptureBehaviorModel, IRepositoryNavigationBehaviorModel } from './capture-behavior-model';

// Adapter for presentation model for the capture component
@Injectable({
    providedIn: 'root'
  })
export class AdapterCapturePresentationModel {
    capturePresentationModel: CapturePresentationModel;
    
    constructor(
        adapterNavigationPresentationModel: AdapterNavigationPresentationModel,
        adapterRunningEventsPresentationModel: AdapterRunningEventsPresentationModel,
        adapterCurrentEventPresentationModel: AdapterCurrentEventPresentationModel
        ) {
        this.capturePresentationModel = new CapturePresentationModel(
            adapterNavigationPresentationModel.navigationPresentationModel,
            adapterRunningEventsPresentationModel.runningEventsPresentationModel,
            adapterCurrentEventPresentationModel.currentEventPresentationModel
            );
    }
}

// Presentation model for the capture component
export class CapturePresentationModel {
    captureBehaviorModel: ICaptureBehaviorModel = new CaptureBehaviorModel();

    navigationPresentationModel: NavigationPresentationModel;
    runningEventsPresentationModel: RunningEventsPresentationModel;
    currentEventPresentationModel?: EventPresentationModel;

    constructor(
        navigationPresentationModel: NavigationPresentationModel,
        runningEventsPresentationModel: RunningEventsPresentationModel,
        currentEventPresentationModel?: EventPresentationModel
        ) {
        this.navigationPresentationModel = navigationPresentationModel;
        this.navigationPresentationModel.repositoryNavigationBehaviorModel = this.captureBehaviorModel.repositoryNavigationBehaviorModel;

        this.runningEventsPresentationModel = runningEventsPresentationModel;
        this.currentEventPresentationModel = currentEventPresentationModel;
    }
}

//------------Navigation model----------------

@Injectable({
    providedIn: 'root'
  })
export class AdapterNavigationPresentationModel {
    navigationPresentationModel = new NavigationPresentationModel();
}


// Presentation model for events/events saved in the repository
export class NavigationPresentationModel  {

    // Count events in the repository
    countEventsInRepository: number = 0;

    // Position of current event in the repository
    currentEventPosition: string = "0";

    repositoryNavigationBehaviorModel?: IRepositoryNavigationBehaviorModel;

    navigateTo(where: string) {
        if (this.repositoryNavigationBehaviorModel) {
            this.repositoryNavigationBehaviorModel.navigateTo(where);
        }
    }
}

//------------Running events presentation model----------------

@Injectable({
    providedIn: 'root'
  })
export class AdapterRunningEventsPresentationModel {
    runningEventsPresentationModel = new RunningEventsPresentationModel();
}

// Presentation model for events/events saved in the repository
export class RunningEventsPresentationModel  {
    
    // The list of runing events/events
    runningEvents: EventPresentationModel[] = [];

    isVisible: boolean = true;

    selectEvent(eventPositionInList: number) {}

    closeSelectedEvents() {}

    deletelectedEvents() {}
}

//------------Current event presentation model -----------------

@Injectable({
    providedIn: 'root'
  })
export class AdapterCurrentEventPresentationModel {
    currentEventPresentationModel?: EventPresentationModel;
}

export class EventPresentationModel {

    eventSelectionPresenationModel = new EventSelectionPresenationModel();
    timeSettingPresenationModel = new TimeSettingPresentationModel();
    parametersSettingPresentationModel = new ParametersSettingPresentationModel();
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";
}

export class EventSelectionPresenationModel {
    eventSelection: string = "";
}

export class TimeSettingPresentationModel {
    startTime: TimePointSettingPresentationModel = new TimePointSettingPresentationModel();
    finishTime?: TimePointSettingPresentationModel;
}  

export class TimePointSettingPresentationModel {
    time: Date = new Date();
    role!: string;
    error?: string;
} 

export class ParametersSettingPresentationModel {}

