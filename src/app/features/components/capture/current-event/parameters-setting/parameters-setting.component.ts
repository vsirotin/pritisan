import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ParametersSettingUIModel } from '../../model/capture-presentation-model';

@Component({
  selector: 'app-parameters-setting',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './parameters-setting.component.html',
  styleUrl: './parameters-setting.component.scss'
})
export class ParametersSettingComponent {

  presentationModel?: ParametersSettingUIModel;

  readonly events: Array<IActivityParameter> = [
    {id: "1.1", label: "Parameter 1.1"},
    {id: "1.2", label: "Parameter 1.2"},
    {id: "2.1", label: "Parameter 2.1"},
  ];

}

interface IActivityParameter {
  id: string;
  label: string;
}



