import { Component } from '@angular/core';

import { Logger } from '../../../../../shared/services/logging/logger';
import { ActivitySelectingUIModel } from '../../../../models/capture/ui-model/current-event-ui-model/activity-selecting-ui-model';
import { CaptureNotificationService } from '../../capture-notification-service';

@Component({
  selector: 'app-activity-type-selecting',
  standalone: true,
  imports: [],
  templateUrl: './activity-type-selecting.component.html',
  styleUrl: './activity-type-selecting.component.scss'
})
export class ActivityTypeSelectingComponent {

  uiModel!: ActivitySelectingUIModel;

  constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
    this.uiModel = new ActivitySelectingUIModel(logger, captureNotificationService);
  }


}

