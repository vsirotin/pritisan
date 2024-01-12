import { Routes } from '@angular/router';
import {CaptureComponent} from './capture/capture.component'
import {EditComponent} from './edit/edit.component'

export const routes: Routes = [
    { path: 'edit', component: EditComponent },
    { path: 'capture', component: CaptureComponent },
   
];
