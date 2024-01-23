import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/components/app/app.config';
import { AppComponent } from './app/core/components/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
