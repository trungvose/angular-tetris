import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { GameState } from '@angular-tetris/interface/game-state';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
import { interval, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 't-pause',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent {
  paused$: Observable<boolean> = toObservable(this.query.gameState$$).pipe(
    switchMap((state) => {
      if (state === GameState.Paused) {
        return interval(250).pipe(map((num) => !!(num % 2)));
      }
      return of(false);
    })
  );

  constructor(private query: TetrisQuery) {}
}
