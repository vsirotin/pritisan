import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';
import { AlternativeSelectionComponent } from '../../../../../shared/components/alternative-selection/alternative-selection.component';


@Component({
  selector: 'app-workflow-type-selection',
  standalone: true,
  imports: [ 
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: '../../../../../shared/components/alternative-selection/alternative-selection.component.html',
  styleUrl: '../../../../../shared/components/alternative-selection/alternative-selection.component.scss'
})
export class WorkflowTypeSelectionComponent extends AlternativeSelectionComponent{

  constructor(logger: Logger) { 
    super(logger, CurrentEventProcessingUIFactory.getWorkflowTypeSettingUIModel(logger));
  }
  
}
