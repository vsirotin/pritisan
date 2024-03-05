import { Injectable } from '@angular/core';



// Adapter for presentation model for the capture component
@Injectable({
    providedIn: 'root'
  })
export class AdapterCapturePresentationModel {
    capturePresentationModel: CapturePresentationModel;
    
    constructor(adapterRepositoryPresentationModel: AdapterRepositoryPresentationModel) {
        this.capturePresentationModel = new CapturePresentationModel(adapterRepositoryPresentationModel.repositoryPresentationModel);
    }
}

// Presentation model for the capture component
export class CapturePresentationModel {
    constructor(repositoryPresentationModel: RepositoryPresentationModel) {}
}

@Injectable({
    providedIn: 'root'
  })
export class AdapterRepositoryPresentationModel {
    repositoryPresentationModel = new RepositoryPresentationModel();
}


// Presentation model for events/events saved in the repository
export class RepositoryPresentationModel  {

    // Count events in the repository
    countEventsInRepository: number = 0;

    // Position of current event in the repository
    currentEventPosition: string = "0";
}

// Presentation model for events/events saved in the repository
export class RunningEventsPresentationModel  {
    
    // The list of runing events/events
    runningEvents!: EventPresentationModel[];

    // Count events in the repository
    countEventsInRepository: number = 0;

    // Position of current event in the repository
    currentEventPosition: number = 0;
}

// Presentation model for event/event
export class EventPresentationModel {
    constructor() {
        this.name = '';
        this.description = '';
        this.startTime = '';
        this.endTime = '';
    }
    // The name of the event/event
    name;
    // The description of the event/event
    description;
    // The start time of the event/event
    startTime;
    // The end time of the event/event
    endTime;
}