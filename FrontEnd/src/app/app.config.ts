import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), DialogModule, DialogService, importProvidersFrom([BrowserAnimationsModule])]
};
