import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GameState } from '@trungk18/interface/game-state';
import { Tile } from '@trungk18/interface/tile/tile';
import { MatrixUtil } from '@trungk18/interface/utils/matrix';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { combineLatest, Observable, of, timer } from 'rxjs';
import { delay, map, startWith, switchMap, takeWhile } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 't-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  matrix$: Observable<Tile[]>;
  constructor(private _tetrisQuery: TetrisQuery) {}

  ngOnInit(): void {
    this.matrix$ = this.getMatrix();
  }

  getMatrix(): Observable<Tile[]> {
    return combineLatest([this._tetrisQuery.gameState$, this._tetrisQuery.matrix$]).pipe(
      untilDestroyed(this),
      switchMap(([gameState, matrix]) => {
        if (gameState !== GameState.Over && gameState !== GameState.Loading) {
          return of(matrix);
        }
        const newMatrix = [...matrix];
        const rowsLength = MatrixUtil.Height * 2;
        const animatedMatrix$: Observable<Tile[]> = timer(0, rowsLength).pipe(
          map((x) => x + 1),
          takeWhile((x) => x <= rowsLength + 1),
          switchMap((idx) => {
            const gridIndex = idx - 1;
            if (gridIndex < MatrixUtil.Height) {
              newMatrix.splice(
                gridIndex * MatrixUtil.Width,
                MatrixUtil.Width,
                ...MatrixUtil.FullRow
              );
            }
            if (gridIndex > MatrixUtil.Height && gridIndex <= rowsLength) {
              const startIdx =
                (MatrixUtil.Height - (gridIndex - MatrixUtil.Height)) * MatrixUtil.Width;
              newMatrix.splice(startIdx, MatrixUtil.Width, ...MatrixUtil.EmptyRow);
            }

            return of(newMatrix);
          })
        );
        return animatedMatrix$;
      })
    );
  }
}
