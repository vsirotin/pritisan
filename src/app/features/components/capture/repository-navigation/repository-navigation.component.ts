import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NavigationUIModel } from '../model/capture-presentation-model';

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

  repositoryUIModel!: NavigationUIModel;

  constructor() {
   

   }

  currentEventPosition: string = "2";
  countEvents: number = 0;

  ngOnInit() {

    this.repositoryUIModel.repositoryNavigationBehaviorModel?.repositoryStateChangeNotificator$.subscribe((repositoryStateExtended) => {
      this.currentEventPosition = repositoryStateExtended.repositoryState.currentEventPosition.toString();
      this.countEvents = repositoryStateExtended.repositoryState.countEventsInRepository;
    })

    this.currentEventPosition = this.repositoryUIModel.currentEventPosition;
    this.countEvents = this.repositoryUIModel.countEventsInRepository;
  }

  navigateTo(where: string) {
    this.repositoryUIModel.navigateTo(where);   
  }


}
