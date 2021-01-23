import { Injectable } from '@angular/core';
declare let gtag: any;
const GOOGLE_ANALYTICS_ID = 'UA-80363801-4';
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() {}

  public sendEvent(
    eventName: string,
    eventCategory: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (!gtag) {
      return;
    }
    /* eslint-disable @typescript-eslint/naming-convention */
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    });
    /* eslint-enable @typescript-eslint/naming-convention */
  }

  public sendPageView(url: string) {
    if (!gtag) {
      return;
    }
    gtag('config', GOOGLE_ANALYTICS_ID, { page_path: url }); // eslint-disable-line @typescript-eslint/naming-convention
  }
}
