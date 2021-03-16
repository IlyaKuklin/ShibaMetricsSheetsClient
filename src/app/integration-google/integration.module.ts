import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from 'ng-gapi';

let gapiClientConfig: NgGapiClientConfig = {
  client_id:
    '941267314517-qphpp9fgc0csh3l6ve6bmbjhh1q76b88.apps.googleusercontent.com',
  discoveryDocs: [
    'https://analyticsreporting.googleapis.com/$discovery/rest?version=v4',
  ],
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ].join(' '),
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig,
    }),
  ],
})
export class IntegrationModule {}
