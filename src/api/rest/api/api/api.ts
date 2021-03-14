export * from './auth.service';
import { AuthApiService } from './auth.service';
export * from './clients.service';
import { ClientsApiService } from './clients.service';
export * from './google-analytics.service';
import { GoogleAnalyticsApiService } from './google-analytics.service';
export * from './google-analytics-v4.service';
import { GoogleAnalyticsV4ApiService } from './google-analytics-v4.service';
export * from './sources.service';
import { SourcesApiService } from './sources.service';
export const APIS = [AuthApiService, ClientsApiService, GoogleAnalyticsApiService, GoogleAnalyticsV4ApiService, SourcesApiService];
