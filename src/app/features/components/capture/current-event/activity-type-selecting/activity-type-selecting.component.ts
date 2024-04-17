import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Logger } from '../../../../../shared/services/logging/logger';
import { ActivitySelectingUIModel } from '../../../../models/capture/ui-model/current-event-ui-model/activity-selecting-ui-model';
import { CaptureNotificationService } from '../../capture-notification-service';

interface ActivityTypeNode {
  name: string;
  children?: ActivityTypeNode[];
}

const TREE_DATA: ActivityTypeNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

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

  uiModel!: ActivitySelectingUIModel;

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

  constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
    this.uiModel = new ActivitySelectingUIModel(logger, captureNotificationService);
    this.dataSource.data = this.uiModel.getTreeData();
   
  }

  onNodeClick(node: ActivityType) {
    this.logger.debug("ActivityTypeSelectingComponent: Node clicked: " + JSON.stringify(node));
    this.uiModel.onNodeClick(node);
  }


}

