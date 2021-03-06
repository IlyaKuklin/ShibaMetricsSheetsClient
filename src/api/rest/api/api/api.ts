export * from './admin.service';
import { AdminApiService } from './admin.service';
export * from './auth.service';
import { AuthApiService } from './auth.service';
export * from './clients.service';
import { ClientsApiService } from './clients.service';
export * from './facebook.service';
import { FacebookApiService } from './facebook.service';
export * from './google-analytics.service';
import { GoogleAnalyticsApiService } from './google-analytics.service';
export * from './sources.service';
import { SourcesApiService } from './sources.service';
export * from './yandex-direct.service';
import { YandexDirectApiService } from './yandex-direct.service';
export const APIS = [AdminApiService, AuthApiService, ClientsApiService, FacebookApiService, GoogleAnalyticsApiService, SourcesApiService, YandexDirectApiService];
