import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GoogleAnalyticsV4ApiService } from 'src/api/rest/api/api/google-analytics-v4.service';
import { GoogleAnalyticsApiService } from 'src/api/rest/api/api/google-analytics.service';
import { SmGoogleAuthService } from 'src/app/integration-google/services/sm-google-auth.service';

@Component({
  selector: 'sm-ga-source',
  templateUrl: './ga-source.component.html',
  styleUrls: ['./ga-source.component.scss'],
})
export class GaSourceComponent implements OnInit {
  constructor(
    private readonly googleAuthService: SmGoogleAuthService,
    private readonly googleAnalyticsApiService: GoogleAnalyticsApiService,
    private readonly googleAnalyticsV4ApiService: GoogleAnalyticsV4ApiService
  ) {
    if (!this.googleAuthService.isUserSignedIn()) {
      this.googleAuthService.signIn();
    }

    forkJoin([
      this.googleAnalyticsApiService.apiGoogleAnalyticsMetadataGet()
    ]).subscribe(response => {
      
    })
  }

  ngOnInit(): void {}
}
