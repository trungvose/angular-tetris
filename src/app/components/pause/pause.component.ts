import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameState } from '@angular-tetris/interface/game-state';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';
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
  paused$: Observable<boolean> = inject(TetrisStore).gameState$.pipe(
    switchMap((state) => {
      if (state === GameState.Paused) {
        return interval(250).pipe(map((num) => !!(num % 2)));
      }
      return of(false);
    })
  );
}
