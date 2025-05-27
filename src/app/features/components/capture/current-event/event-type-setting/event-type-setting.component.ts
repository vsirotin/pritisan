import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTree, CdkTreeModule} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import * as uiItems from '../../../../../../assets/languages/masterdata/lang/1/en-EN.json';

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
  templateUrl: './event-type-setting.component.html',
  styleUrl: './event-type-setting.component.scss'
})


export class EventTypeSettingComponent  implements  OnDestroy, ILocalizationClient<INestedOntologyNode[]>{

  @ViewChild(CdkTree)

  ui: INestedOntologyNode[] = (uiItems as any).default;

  private localizer  =  LocalizerFactory.createLocalizer<INestedOntologyNode[]>(MY_DIR, 1, this.ui, this);
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventTypeSettingComponent");

  tree!: CdkTree<INestedOntologyNode>;

  childrenAccessor = (dataNode: INestedOntologyNode) => dataNode.children ?? [];

  dataSource = new ArrayDataSource(this.ui);

  hasChild = (_: number, node: INestedOntologyNode) => !!node.children?.length;

  constructor() {
    this.logger.debug("constructor");

  }

  onNodeClick(node: any) {
    this.logger.debug("onNodeClick node: " + JSON.stringify(node));
  alert("EventTypeSettingComponent: Node clicked: " + JSON.stringify(node));
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
