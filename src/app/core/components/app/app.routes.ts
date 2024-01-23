import {Routes} from '@angular/router';
import {CaptureComponent} from '../../../features/components/capture/capture.component'
import {EditComponent} from '../../../features/components/edit/edit.component'
import {ImportExportComponent} from '../../../features/components/import-export/import-export.component'
import {SettingsComponent} from '../../../features/components/settings/settings.component'
import {InfoComponent} from '../../../features/components/info/info.component'
import {AnalysisComponent} from '../../../features/components/analysis/analysis.component'

export const routes: Routes = [
    { path: 'edit', component: EditComponent, title: "PriTiSAn: Edit" },
    { path: 'capture', component: CaptureComponent, title: "PriTiSAn: Capture" },
    { path: 'import-export', component: ImportExportComponent, title: "PriTiSAn: Import/Export" },
    { path: 'settings', component: SettingsComponent, title: "PriTiSAn: Settings" },
    { path: 'info', component: InfoComponent, title: "PriTiSAn: Info" },
    { path: 'analysis', component: AnalysisComponent, title: "PriTiSAn: Analysis" },
    { path: '', component: CaptureComponent, title: "PriTiSAn: Capture" },
];
