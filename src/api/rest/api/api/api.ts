export * from './auth.service';
import { AuthApiService } from './auth.service';
export * from './clients.service';
import { ClientsApiService } from './clients.service';
export const APIS = [AuthApiService, ClientsApiService];
