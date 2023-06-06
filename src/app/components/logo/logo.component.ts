import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

type RunningSide = 'r' | 'l';

type LogoState = 'running' | 'blinking' | 'rest';

interface RunningState {
  count: number;
  side: RunningSide;
}

@Component({
  selector: 't-logo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  private runState = signal<RunningState>({
    count: 1,
    side: 'r'
  });
  private blinkingCount = signal(1);
  private mode = signal<LogoState>('running');

  className = computed(() => {
    switch (this.mode()) {
      case 'running': {
        return this.getRunningClassName();
      }
      default: {
        return this.getBlinkingClassName();
      }
    }
  });

  private intervalRef = null;
  private setTimeoutRef = null;

  constructor() {
    effect(
      () => {
        switch (this.mode()) {
          case 'running': {
            if (!this.intervalRef) {
              this.intervalRef = this.startRunning();
            }

            const { count } = this.runState();

            if (count > 40) {
              this.clearInterval();
              this.mode.set('blinking');
              this.runState.set({
                count: 1,
                side: 'r'
              });
            }
            break;
          }
          case 'blinking': {
            if (!this.intervalRef) {
              this.intervalRef = this.startBlinking();
            }

            if (this.blinkingCount() >= 6) {
              this.clearInterval();
              this.mode.set('rest');
              this.blinkingCount.set(1);
            }
            break;
          }
          case 'rest': {
            this.setTimeoutRef = setTimeout(() => {
              this.mode.set('running');
            }, 5000);
            break;
          }
        }
      },
      { allowSignalWrites: true }
    );

    inject(DestroyRef).onDestroy(() => {
      if (this.intervalRef) {
        clearInterval(this.intervalRef);
      }

      if (this.setTimeoutRef) {
        clearTimeout(this.setTimeoutRef);
      }
    });
  }

  private startBlinking() {
    return setInterval(() => {
      this.blinkingCount.update((count) => count + 1);
    }, 500);
  }

  private startRunning() {
    return setInterval(() => {
      this.runState.update(({ count, side }) => {
        const newCount = count + 1;

        return {
          count: newCount,
          side:
            newCount === 10 || newCount === 20 || newCount === 30
              ? side === 'r'
                ? 'l'
                : 'r'
              : side
        };
      });
    }, 100);
  }

  private getRunningClassName(): string {
    const { count, side } = this.runState();
    const state = count === 41 ? 1 : count % 2 === 0 ? 3 : 4;
    return `${side}${state}`;
  }

  private getBlinkingClassName() {
    const state = this.blinkingCount() % 2 === 0 ? 1 : 2;

    return `l${state}`;
  }

  private clearInterval() {
    clearInterval(this.intervalRef);
    this.intervalRef = null;
  }
}
