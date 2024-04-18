import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Logger } from '../../../../../shared/services/logging/logger';
import { ActivitySelectingUIModel, IActivitySelectingUIModel } from '../../../../models/capture/ui-model/current-event-ui-model/activity-selecting-ui-model';
import { CurrentEventNotificationService } from '../current-event-notification-service';

interface ActivityTypeNode {
  name: string;
  children?: ActivityTypeNode[];
}


/** Flat node with expandable and level information */
interface ActivityType {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-activity-type-selecting',
  standalone: true,
  imports: [
    MatTreeModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './activity-type-selecting.component.html',
  styleUrl: './activity-type-selecting.component.scss'
})
export class ActivityTypeSelectingComponent {

  uiModel!: IActivitySelectingUIModel;

  private _transformer = (node: ActivityTypeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ActivityType>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ActivityType) => node.expandable;

  constructor(private logger: Logger, private captureNotificationService: CurrentEventNotificationService) {
    this.uiModel = new ActivitySelectingUIModel(logger, captureNotificationService);
    this.uiModel.getActiviyTypes().then(data => {
      this.logger.debug("ActivityTypeSelectingComponent: Data loaded: " + JSON.stringify(data));
      this.dataSource.data = data;
    });
   
  }

  onNodeClick(node: ActivityType) {
    this.logger.debug("ActivityTypeSelectingComponent: Node clicked: " + JSON.stringify(node));
    this.uiModel.onActivityTypeSelected(node);
  }


}

