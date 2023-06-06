import { GameState } from '@angular-tetris/interface/game-state';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
@Component({
  selector: 't-matrix',
  standalone: true,
  imports: [TileComponent, NgFor],
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixComponent {
  private tetrisState = inject(TetrisStateService);

  matrix = signal<Tile[]>([]);

  animatedTimerCount = 1;
  animatedTimerRef = null;

  constructor() {
    effect(
      () => {
        const gameState = this.tetrisState.gameState();

        if (gameState !== GameState.Over && gameState !== GameState.Loading) {
          this.matrix.set(this.tetrisState.matrix());
          return;
        }

        if (this.animatedTimerRef) {
          clearInterval(this.animatedTimerRef);
        }

        this.startAnimateMatrix();
      },
      {
        allowSignalWrites: true
      }
    );

    inject(DestroyRef).onDestroy(() => {
      if (this.animatedTimerRef) {
        clearInterval(this.animatedTimerRef);
      }
    });
  }

  private startAnimateMatrix() {
    const newMatrix = [...this.tetrisState.matrix()];
    const rowsLength = MatrixUtil.Height * 2;

    // Start first animated matrix to simulate timer(0, delay)
    this.setAnimateMatrix(newMatrix, rowsLength);

    this.animatedTimerRef = setInterval(() => {
      this.animatedTimerCount++;
      if (this.animatedTimerCount > rowsLength + 1) {
        this.animatedTimerCount = 1;

        if (this.animatedTimerRef) {
          clearInterval(this.animatedTimerRef);
        }

        return;
      }

      this.setAnimateMatrix(newMatrix, rowsLength);
    }, rowsLength);
  }

  private setAnimateMatrix(newMatrix: Tile[], rowsLength: number) {
    const gridIndex = this.animatedTimerCount - 1;
    if (gridIndex < MatrixUtil.Height) {
      newMatrix.splice(gridIndex * MatrixUtil.Width, MatrixUtil.Width, ...MatrixUtil.FullRow);
    }
    if (gridIndex > MatrixUtil.Height && gridIndex <= rowsLength) {
      const startIdx = (MatrixUtil.Height - (gridIndex - MatrixUtil.Height)) * MatrixUtil.Width;
      newMatrix.splice(startIdx, MatrixUtil.Width, ...MatrixUtil.EmptyRow);
    }

    this.matrix.set(newMatrix);
  }
}
