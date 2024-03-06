import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AdapterRepositoryPresentationModel } from '../model/capture-presentation-model';
import { RepositoryPresentationModel } from '../model/capture-presentation-model';

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

  repositoryPresentationModel: RepositoryPresentationModel;

  constructor(private adapterRepositoryPresentationModel: AdapterRepositoryPresentationModel) {
    this.repositoryPresentationModel = this.adapterRepositoryPresentationModel.repositoryPresentationModel;
    this.repositoryPresentationModel.repositoryNavigationBehaviorModel?.repositoryStateChangeNotificator$.subscribe((repositoryStateExtended) => {
      this.currentEventPosition = repositoryStateExtended.repositoryState.currentEventPosition.toString();
      this.countEvents = repositoryStateExtended.repositoryState.countEventsInRepository;
    })

   }

  currentEventPosition: string = "2";
  countEvents: number = 0;

  ngOnInit() {
    this.currentEventPosition = this.repositoryPresentationModel.currentEventPosition;
    this.countEvents = this.repositoryPresentationModel.countEventsInRepository;
  }

  navigateTo(where: string) {
    this.repositoryPresentationModel.navigateTo(where);   
  }


}
