// This service allowes to notificate 'main' capture component about updates in added/edited event
// maded by sub-components.

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IEventChange } from './current-event-processing-ui-model';

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

