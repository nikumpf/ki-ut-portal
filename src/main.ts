import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { ConfirmationService, MessageService } from 'primeng/api';

Amplify.configure(outputs);

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  MessageService,
  ConfirmationService
];

appConfig.providers = appConfig.providers.concat(providers);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
