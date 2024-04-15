// This service allowes to notificate 'main' capture component about updates in added/edited event
// maded by sub-components.

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CaptureNotificationService {
  private subject = new Subject<string>();
  captureNotification$ = this.subject.asObservable();

  notifyCaptureComponent(notification: string) {
    this.subject.next(notification);
  }
}

