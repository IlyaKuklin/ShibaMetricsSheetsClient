import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { BASE_PATH } from 'src/api/rest/api';
import { environment } from 'src/environments/environment';
import { ClientsModule } from './clients/clients.module';
import { SourcesModule } from './sources/sources.module';
import { IntegrationGoogleModule } from './integration-google/integration-google.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    AdminModule,
    AuthModule,
    ClientsModule,
    SourcesModule,
    IntegrationGoogleModule,

    HttpClientModule,
    // Всегда последний для 404ой
    AppRoutingModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.basePath },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
