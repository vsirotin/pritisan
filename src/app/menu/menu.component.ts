import {ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDrawer} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import {CommunicatorService} from '../toolbar/service/communicator.service'
import { Subscription } from 'rxjs';
import {ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatListModule, 
    RouterModule,
    ToolbarComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy {
  private subscription: Subscription;
//  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('snav') snav!: MatSidenavModule;

  showFiller = false;

  isShowing = false

  mobileQuery!: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener!: () => void;

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
    if (this.snav) {
      //  this.snav.toggle();
    }
  }

  ngOnDestroy() {
    // Always unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
