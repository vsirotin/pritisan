import {Routes} from '@angular/router';
import {CaptureComponent} from './capture/capture.component'
import {EditComponent} from './edit/edit.component'
import {ImportExportComponent} from './import-export/import-export.component'
import {SettingsComponent} from './settings/settings.component'
import {InfoComponent} from './info/info.component'
import {AnalysisComponent} from './analysis/analysis.component'

export const routes: Routes = [
    { path: 'edit', component: EditComponent },
    { path: 'capture', component: CaptureComponent },
    { path: 'import-export', component: ImportExportComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'info', component: InfoComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: '', component: CaptureComponent },
];
