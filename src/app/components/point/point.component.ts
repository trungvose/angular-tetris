import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NumberComponent } from '../number/number.component';

const REFRESH_LABEL_INTERVAL = 3000;
@UntilDestroy()
@Component({
  selector: 't-point',
  standalone: true,
  imports: [NumberComponent, NgIf],
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointComponent {
  private timerRef: number;
  private tetrisState = inject(TetrisStateService);

  labelAndPoints = signal<LabelAndNumber>(null);

  constructor() {
    effect(
      () => {
        if (this.timerRef) {
          clearInterval(this.timerRef);
        }

        if (this.tetrisState.hasCurrent()) {
          this.labelAndPoints.set(new LabelAndNumber('Score', this.tetrisState.points()));
          return;
        }

        // Replicate timer(0, 1000)
        this.labelAndPoints.set(new LabelAndNumber('Score', this.tetrisState.points()));
        this.timerRef = setInterval(() => {
          this.labelAndPoints.update(({ label }) => {
            return label === 'Max '
              ? new LabelAndNumber('Score', this.tetrisState.points())
              : new LabelAndNumber('Max ', this.tetrisState.max());
          });
        }, REFRESH_LABEL_INTERVAL);
      },
      { allowSignalWrites: true }
    );

    inject(DestroyRef).onDestroy(() => {
      if (this.timerRef) {
        clearInterval(this.timerRef);
      }
    });
  }
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
