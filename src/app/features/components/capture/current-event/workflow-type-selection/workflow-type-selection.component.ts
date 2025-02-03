import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule} from '@angular/material/expansion';
import { AlternativeSelectionComponent } from '../../../../../shared/components/alternative-selection/alternative-selection.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';


@Component({
  selector: 'app-workflow-type-selection',
  standalone: true,
  imports: [ 
    MatExpansionModule,
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: '../../../../../shared/components/alternative-selection/alternative-selection.component.html',
  styleUrl: '../../../../../shared/components/alternative-selection/alternative-selection.component.scss'
})
export class WorkflowTypeSelectionComponent extends AlternativeSelectionComponent {

  private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WorkflowTypeSelectionComponent"); 
  constructor() { 
    super(CurrentEventProcessingUIFactory.getWorkflowTypeSettingUIModel());
  }
  
}
