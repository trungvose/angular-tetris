import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppComponent } from '@angular-tetris/app.component';
import { environment } from './environments/environment';

const initSentry = () => {
  Sentry.init({
    dsn: 'https://91dfe2ed3a6c47f8a5a14188066cc9f2@o495789.ingest.sentry.io/5570178',
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'https://tetris.trungk18.com'],
        routingInstrumentation: Sentry.routingInstrumentation
      })
    ],
    tracesSampleRate: 1.0
  });
};

if (environment.production) {
  enableProdMode();
  initSentry();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AkitaNgDevtools.forRoot()),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler()
    }
  ]
});
