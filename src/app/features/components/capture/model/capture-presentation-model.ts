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
        adapterRunningEventsPresentationModel: AdapterRunningEventsPresentationModel
        ) {
        this.capturePresentationModel = new CapturePresentationModel(
            adapterNavigationPresentationModel.navigationPresentationModel,
            adapterRunningEventsPresentationModel.runningEventsPresentationModel
            );
    }
}

// Presentation model for the capture component
export class CapturePresentationModel {
    captureBehaviorModel: ICaptureBehaviorModel = new CaptureBehaviorModel();

    navigationPresentationModel: NavigationPresentationModel;
    runningEventsPresentationModel: RunningEventsPresentationModel;

    constructor(
        navigationPresentationModel: NavigationPresentationModel,
        runningEventsPresentationModel: RunningEventsPresentationModel) {
        this.navigationPresentationModel = navigationPresentationModel;
        this.navigationPresentationModel.repositoryNavigationBehaviorModel = this.captureBehaviorModel.repositoryNavigationBehaviorModel;

        this.runningEventsPresentationModel = runningEventsPresentationModel;
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

//------------Event presentation model -----------------
export class EventPresentationModel {
    durationInHours: number = 0;

    startTime?: Date;
    finishTime?: Date;

    type: string = "";

    details: string = "";
}

