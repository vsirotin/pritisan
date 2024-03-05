// Presentation model for the capture component
export class CapturePresentationModel {
    constructor() {

    }

}


// Presentation model for events/events saved in the repository
export class RepositoryPresentationModel  {
    
    // The list of runing events/events
    runningEvents!: EventPresentationModel[];

    // Count events in the repository
    countEventsInRepository: number = 0;

    // Position of current event in the repository
    currentEventPosition: number = 0;
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