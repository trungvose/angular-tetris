import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

const REFRESH_CLOCK_INTERVAL = 1000;
@UntilDestroy()
@Component({
  selector: 't-clock',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  private unregisterFn = inject(DestroyRef).onDestroy(() => {
    clearInterval(this.timerInterval);
  });

  clockValues = signal(this.renderClock());

  timerInterval = setInterval(() => {
    this.clockValues.set(this.renderClock());
  }, REFRESH_CLOCK_INTERVAL);

  renderClock(): string[] {
    const now = new Date();
    const hours = this.formatTwoDigits(now.getHours());
    const minutes = this.formatTwoDigits(now.getMinutes());
    const isOddSecond = now.getSeconds() % 2 !== 0;
    const blinking = `colon-${isOddSecond ? 'solid' : 'faded'}`;
    return [...hours, blinking, ...minutes];
  }

  formatTwoDigits(num: number): string[] {
    return `${num}`.padStart(2, '0').split('');
  }
}
