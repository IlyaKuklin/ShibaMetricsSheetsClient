export * from './auth.service';
import { AuthApiService } from './auth.service';
export * from './clients.service';
import { ClientsApiService } from './clients.service';
export * from './sources.service';
import { SourcesApiService } from './sources.service';
export const APIS = [AuthApiService, ClientsApiService, SourcesApiService];
