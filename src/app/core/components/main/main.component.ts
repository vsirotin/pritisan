import {ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import {CommunicatorService} from '../toolbar/service/communicator.service'
import { Subscription } from 'rxjs';
import {ToolbarComponent } from '../toolbar/toolbar.component';
import { Logger } from '../../../shared/services/logging/logger';
import { ILocalizer , Localizer } from '../../../shared/classes/localization/localizer';
import { ILanguageChangeNotificator } from '../../../shared/classes/localization/language-change-notificator';
import { DEFAULT_LANG_TAG, ILanguageDescription } from '../../../shared/classes/localization/language-description';

export const MAIN_SOURCE_DIR = "assets/languages/core/components/main/lang/";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatListModule, 
    RouterModule,
    ToolbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('snav') snav!: MatSidenavModule;

  private subscriptionBtnClicked: Subscription;
  private subscriptionLangChanged: Subscription;

  showFiller = false;

  isShowing = false

  mobileQuery!: MediaQueryList;

  readonly navItemsDefault: Array<NavigationEntry> = [
    {id: "capture", label: "Capture",  link: "capture", icon: "feed"},
    {id: "edit", label: "Edit",  link: "edit", icon: "edit_square"},
    {id: "analysis", label: "Analysis",  link: "analysis", icon: "area_chart"},
    {id: "import_export", label: "Import/Export",  link: "import-export", icon: "app_shortcut"},
    {id: "settings", label: "Settings",  link: "settings", icon: "settings"},
    {id: "info", label: "Info",  link: "info", icon: "help"}
  ];

  private _mobileQueryListener!: () => void;
  localizer: Localizer = new Localizer(MAIN_SOURCE_DIR, 1, new Logger());
  languageChangeNotificator: ILanguageChangeNotificator = Localizer.languageChangeNotificator;

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, 
   media: MediaMatcher, 
   private cdr: ChangeDetectorRef,
   private logger: Logger) {
    this.logger.debug("Start of MainComponent.constructor");

    this.subscriptionBtnClicked = this.communicatorService.buttonClicked$.subscribe(() => {
      this.logger.debug("Start of MainComponent.subscriptionBtnClicked");
      this.toggleMenu();
    });

    this.subscriptionLangChanged = this
    .languageChangeNotificator.selectionChanged$
    .subscribe((selectedLanguage: ILanguageDescription) => {
      this.logger.debug("Start of MainComponent.subscriptionLangChanged selectedLanguage=" + JSON.stringify(selectedLanguage));
      this.logger.debug("MainComponent.subscriptionLangChanged after resetNavItems");
      this.cdr.detectChanges();
      this.logger.debug("MainComponent.subscriptionLangChanged completed");
    }); 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.logger.debug("End of MainComponent.constructor"); 
  }

  async ngOnInit() {
    this.logger.debug("Start of MainComponent.ngOnInit");
    await this.localizer.initializeLanguage();
    this.logger.debug("End of MainComponent.ngOnInit");
  }

  // private async resetNavItems(selectedLangIetfTag: string){
  //   this.logger.debug("Start of MainComponent.resetNavItems selectedLangIetfTag=" + selectedLangIetfTag);
  //   if(selectedLangIetfTag == DEFAULT_LANG_TAG){
  //     this.logger.debug("MainComponent.resetNavItems selectedLangIetfTag == DEFAULT_LANG_TAG : make a deep copy of navItemsDefault and assign it to navItems");
  //     this.navItems =  deepCopyArray<NavigationEntry>(this.navItemsDefault);
  //     return
  //   }
  //   this.logger.debug("MainComponent.resetNavItems using translations");
  //   this.navItems.forEach((item) => {
  //       item.label = this.localizer.getTranslation(item.id, item.label);
  //   });
  // }

  t(id: string) {
    const defaultLabel = this.navItemsDefault.find(item => item.id === id)?.label || id;
    return this.localizer.getTranslation(id, defaultLabel);
  }

  toggleMenu() {
    this.isShowing = !this.isShowing
  }

  ngOnDestroy() {
    // Always unsubscribe to prevent memory leaks
    this.subscriptionBtnClicked.unsubscribe();
    this.subscriptionLangChanged.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

};

interface NavigationEntry {
  id: string;
  label: string;
  link: string;
  icon: string;
}

function deepCopyArray<T>(arr: Array<T>): Array<T> {
  return arr.map(item => Object.assign({}, item));
}

