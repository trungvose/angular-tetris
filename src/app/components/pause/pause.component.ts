import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { GameState } from '@trungk18/interface/game-state';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { interval, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 't-pause',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent {
  paused$: Observable<boolean> = this._query.gameState$.pipe(
    switchMap((state) => {
      if (state === GameState.Paused) {
        return interval(250).pipe(map((num) => !!(num % 2)));
      }
      return of(false);
    })
  );

  constructor(private _query: TetrisQuery) {}
}
