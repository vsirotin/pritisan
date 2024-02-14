import {ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
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
export class MainComponent implements OnDestroy {
  private subscription: Subscription;
  @ViewChild('snav') snav!: MatSidenavModule;

  showFiller = false;

  isShowing = false

  mobileQuery!: MediaQueryList;

  navItems: Array<NavigationEntry> = [
    {labelKey: "Capture",  link: "capture", icon: "feed"},
    {labelKey: "Edit",  link: "edit", icon: "edit_square"},
    {labelKey: "Analysis",  link: "analysis", icon: "area_chart"},
    {labelKey: "Import-export",  link: "import-export", icon: "app_shortcut"},
    {labelKey: "Settings",  link: "settings", icon: "settings"},
    {labelKey: "Info",  link: "info", icon: "help"}
  ];


  private _mobileQueryListener!: () => void;
  //localizer: ILocalizer = new Localizer("main", 1, this.languageSelectionNotificationService.selectionChanged$, new Logger());

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.subscription = this.communicatorService.buttonClicked$.subscribe(() => {
      this.toggleMenu();
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggleMenu() {
    this.isShowing = !this.isShowing
  }

  ngOnDestroy() {
    // Always unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  // t(key: string, defaultText: string): string {
  //   return this.localizer.getTranslation(key, defaultText);
  // }
}

interface NavigationEntry {
  labelKey: string;
  link: string;
  icon: string;
}

