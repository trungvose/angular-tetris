import { GameState } from '@angular-tetris/interface/game-state';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';

@Component({
  selector: 't-pause',
  standalone: true,
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PauseComponent {
  private tetrisState = inject(TetrisStateService);
  private timerRef: number;
  paused = signal(false);

  constructor() {
    effect(
      () => {
        if (this.timerRef) {
          clearInterval(this.timerRef);
        }

        if (this.tetrisState.gameState() === GameState.Paused) {
          this.timerRef = setInterval(() => {
            this.paused.update((pausedValue) => !pausedValue);
          }, 250);

          return;
        }

        this.paused.set(false);
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
