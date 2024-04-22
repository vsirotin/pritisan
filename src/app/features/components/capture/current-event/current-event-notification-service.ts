// This service allowes to notificate 'main' capture component about updates in added/edited event
// maded by sub-components.

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IEventPart } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';

@Injectable({
    providedIn: 'root'
})

export class CurrentEventNotificationService {
  private subject = new Subject<IEventPart>();
  captureNotification$ = this.subject.asObservable();

  notifyAboutUserAction(notification: IEventPart) {
    this.subject.next(notification);
  }
}

