import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RepositoryNavigationUIModel } from '../model/capture-ui-model';

@Component({
  selector: 'app-repository-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './repository-navigation.component.html',
  styleUrl: './repository-navigation.component.scss'
})
export class RepositoryNavigationComponent implements OnInit {

  uiModel!: RepositoryNavigationUIModel;

  constructor() {
   

   }

  currentEventPosition: string = "2";
  countEvents: number = 0;

  ngOnInit() {

    // this.uiModel.repositoryNavigationBehaviorModel.repositoryStateChangeNotificator$.subscribe((repositoryStateExtended) => {
    //   this.currentEventPosition = repositoryStateExtended.repositoryState.currentEventPosition.toString();
    //   this.countEvents = repositoryStateExtended.repositoryState.countEventsInRepository;
    //})

    // this.currentEventPosition = this.uiModel.currentEventPosition;
    // this.countEvents = this.uiModel.countEventsInRepository;
  }

  navigateTo(where: string) {
    this.uiModel.navigateTo(where);   
  }


}
