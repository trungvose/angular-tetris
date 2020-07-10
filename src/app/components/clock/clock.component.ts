import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const REFRESH_CLOCK_INTERVAL = 1000;
@UntilDestroy()
@Component({
  selector: 't-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  clock$: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.clock$ = interval(REFRESH_CLOCK_INTERVAL).pipe(
      untilDestroyed(this),
      map(() => this.renderClock())
    );
  }

  renderClock(): string[] {
    let now = new Date();
    let hours = this.formatTwoDigits(now.getHours());
    let minutes = this.formatTwoDigits(now.getMinutes());
    let isOddSecond = now.getSeconds() % 2 !== 0;
    let blinking = `colon-${isOddSecond ? 'solid' : 'faded'}`;
    return [...hours, blinking, ...minutes];
  }

  formatTwoDigits(num: number): string[] {
    return `${num}`.padStart(2, '0').split('');
  }
}
