import {Routes} from '@angular/router';
import {CaptureComponent} from './capture/capture.component'
import {EditComponent} from './edit/edit.component'
import {ImportExportComponent} from './import-export/import-export.component'
import {SettingsComponent} from './settings/settings.component'
import {InfoComponent} from './info/info.component'
import {AnalysisComponent} from './analysis/analysis.component'

export const routes: Routes = [
    { path: 'edit', component: EditComponent, title: "PriTiSAn: Edit" },
    { path: 'capture', component: CaptureComponent, title: "PriTiSAn: Capture" },
    { path: 'import-export', component: ImportExportComponent, title: "PriTiSAn: Import/Export" },
    { path: 'settings', component: SettingsComponent, title: "PriTiSAn: Settings" },
    { path: 'info', component: InfoComponent, title: "PriTiSAn: Info" },
    { path: 'analysis', component: AnalysisComponent, title: "PriTiSAn: Analysis" },
    { path: '', component: CaptureComponent, title: "PriTiSAn: Capture" },
];
