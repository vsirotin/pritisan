import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureNotificationService } from "../../../../components/capture/capture-notification-service";
import { IActivityTypeNode } from "../../capture-common-interfaces";

export interface IActivitySelectingUIModel {
    getTreeData(): IActivityTypeNode[];
    onNodeClick(node: IActivityTypeNode): void;
}

export class ActivitySelectingUIModel {
 
      ACTIVITY_TYPES_DATA: IActivityTypeNode[] = [
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

    getTreeData(): IActivityTypeNode[] {
      return this.ACTIVITY_TYPES_DATA;
    }
    constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
        
    }

    onNodeClick(node: IActivityTypeNode) {
        throw new Error('Method not implemented.');
    }

}