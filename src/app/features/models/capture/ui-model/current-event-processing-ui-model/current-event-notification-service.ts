// This service allowes to notificate 'main' capture component about updates in added/edited event
// maded by sub-components.

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CurrentEventChangeNotificationService {
  private subject = new Subject<IEventChange>();
  eventDescriptionNotification$ = this.subject.asObservable();

  notifyEventChange(eventChange: IEventChange) {
    this.subject.next(eventChange);
  }
}

// Represents information about event change of part of processing event.
export interface IEventChange {
    //represent Id of signal in finity automation to process this changing
    signalId: string;

    //represent name of event changing process or event 
    localizedName: string;
}

