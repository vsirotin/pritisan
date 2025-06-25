import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTree, CdkTreeModule} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import * as uiItems from '../../../../../assets/languages/masterdata/lang/1/en-US.json';
import { CurrentEventProcessingUIModel } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { CurrentEventProcessingBusinessLogicModel } from '../../../models/capture/business-logic-model/current-event-business-logic-model/current-event-business-logic-model';
import { CaptureController } from '../../controller/capture-controller';
import { IActityTypeProvider, IActivityType } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';

const MY_DIR = "assets/languages/masterdata/lang";

interface INestedOntologyNode {
  name: string;
  id: string;
  children?: INestedOntologyNode[];
}


@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
     CdkTreeModule, MatButtonModule, MatIconModule
  ],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity-type-setting.html',
  styleUrl: './activity-type-setting.scss'
})


export class ActivityTypeSettingComponent  implements  OnDestroy, 
  IActityTypeProvider, ILocalizationClient<INestedOntologyNode[]>{


  @ViewChild(CdkTree)

  ui: INestedOntologyNode[] = (uiItems as any).default;

  private localizer  =  LocalizerFactory.createLocalizer<INestedOntologyNode[]>(MY_DIR, 1, this.ui, this);
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventTypeSettingComponent");

  tree!: CdkTree<INestedOntologyNode>;

  childrenAccessor = (dataNode: INestedOntologyNode) => dataNode.children ?? [];

  dataSource = new ArrayDataSource(this.ui);

  hasChild = (_: number, node: INestedOntologyNode) => !!node.children?.length;
  selectedEventTypeId: string = "";
  selectedEventTypeName: string = "";

  ngAfterViewInit() {
    this.logger.debug("ngAfterViewInit");
    CaptureController.setActivityTypeProvider(this);
  }


  onNodeClick(node: any) {
    this.logger.debug("onNodeClick node: " + JSON.stringify(node));
    this.selectedEventTypeId = node.id as string;
    this. selectedEventTypeName = node.name as string;
  }

  getActivityType(): IActivityType {
    return {activityTypeId: this.selectedEventTypeId, activityName: this.selectedEventTypeName};
  }

  ngOnDestroy() {
    this.logger.debug("ngOnDestroy");
    this.localizer.dispose();
  }

  updateLocalization(data: INestedOntologyNode[]): void {
    this.logger.debug("updateLocalization data: " + JSON.stringify(data));
    this.ui = data;
  }

}
