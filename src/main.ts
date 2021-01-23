import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


const initSentry = () => {
  Sentry.init({
    dsn: 'https://91dfe2ed3a6c47f8a5a14188066cc9f2@o495789.ingest.sentry.io/5570178',
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'https://tetris.trungk18.com'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });
};

if (environment.production) {
  enableProdMode();
  initSentry();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
