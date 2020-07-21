import { Component, OnInit } from '@angular/core';
import { GameState } from '@trungk18/interface/game-state';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { interval, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 't-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit {
  paused$: Observable<boolean>;

  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.paused$ = this._query.gameState$.pipe(
      switchMap((state) => {
        if (state === GameState.Paused) {
          return interval(250).pipe(map((num) => !!(num % 2)));
        }
        return of(false);
      })
    );
  }
}
