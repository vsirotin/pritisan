import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatButtonModule}  from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommunicatorService } from '../toolbar/service/communicator.service'
import { Subscription } from 'rxjs';
import { ToolbarComponent } from '../toolbar/toolbar.component';


import { CaptureComponent } from '../../../features/capture/capture.component'
import { EditComponent } from '../../../features/components/edit/edit.component'
import { ImportExportComponent } from '../../../features/components/import-export/import-export.component'
import { SettingsComponent } from '../../../features/components/settings/settings.component'
import { InfoComponent } from '../../../features/components/info/info.component'
import { AnalysisComponent } from '../../../features/components/analysis/analysis.component'
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';

export const MAIN_SOURCE_DIR = "assets/languages/core/components/main/lang";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatListModule, 
    RouterModule,
    ToolbarComponent,
    CaptureComponent,
    EditComponent,
    ImportExportComponent,
    SettingsComponent,
    InfoComponent,
    AnalysisComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements  OnDestroy, ILocalizationClient<IUIMainComponent> {
  @ViewChild('snav') snav!: MatSidenavModule;

  private subscriptionBtnClicked: Subscription;

  showFiller = false;

  isShowing = false;

  currentCommponent = "capture";

  mobileQuery!: MediaQueryList;

  ui: IUIMainComponent = {
    navigationLabeles: [
      {id: "capture", label: "Capture"},
      {id: "edit", label: "Edit"},
      {id: "analysis", label: "Analysis"},
      {id: "import_export", label: "Import/Export"},
      {id: "settings", label: "Settings"},
      {id: "info", label: "Info"}
    ]
  }

  mapId2Icons = new Map<string, string>;

  private _mobileQueryListener!: () => void;

  private localizer  =  LocalizerFactory.createLocalizer<IUIMainComponent>(MAIN_SOURCE_DIR, 1, this.ui, this);

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.MainComponent");

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, 
   media: MediaMatcher, 
   private cdr: ChangeDetectorRef) {
    this.logger.debug("Start of MainComponent.constructor");

    this.subscriptionBtnClicked = this.communicatorService.buttonClicked$.subscribe(() => {
      this.logger.debug("Start of MainComponent.subscriptionBtnClicked");
      this.toggleMenu();
    }); 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.logger.debug("End of MainComponent.constructor"); 
  }
  updateLocalization(data: IUIMainComponent): void {
    this.logger.debug("In updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }


  selectMenuItem(id: string) {
    this.logger.debug("Start of MainComponent.selectMenuItem id=" + id);
    this.currentCommponent = id;
    this.toggleMenu();
  }

  toggleMenu() {
    this.isShowing = !this.isShowing
  }

  ngOnDestroy() {
    // Always unsubscribe to prevent memory leaks
    this.subscriptionBtnClicked.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.localizer.dispose();
  }

};

interface INavigationEntry {
  id: string;
  label: string;
}

interface IUIMainComponent {
  navigationLabeles : INavigationEntry[];
}


