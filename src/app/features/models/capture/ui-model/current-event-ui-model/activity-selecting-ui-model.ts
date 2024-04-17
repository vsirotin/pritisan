import { Logger } from "../../../../../shared/services/logging/logger";
import { CaptureNotificationService } from "../../../../components/capture/capture-notification-service";

export interface ActivityTypeNode {
    name: string;
    children?: ActivityTypeNode[];
  }

export class ActivitySelectingUIModel {
 
      ACTIVITY_TYPES_DATA: ActivityTypeNode[] = [
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

    getTreeData(): ActivityTypeNode[] {
      return this.ACTIVITY_TYPES_DATA;
    }
    constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) {
        
    }

    onNodeClick(node: ActivityTypeNode) {
        throw new Error('Method not implemented.');
    }

}