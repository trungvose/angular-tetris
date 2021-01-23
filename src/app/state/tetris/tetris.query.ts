import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TetrisStore, TetrisState } from './tetris.store';
import { GameState } from '@trungk18/interface/game-state';
import { map, delay, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TetrisQuery extends Query<TetrisState> {
  next$ = this.select('next');
  matrix$ = this.select('matrix');
  sound$ = this.select('sound');
  gameState$ = this.select('gameState');
  hasCurrent$ = this.select('current').pipe(map((x) => !!x));
  points$ = this.select('points');
  clearedLines$ = this.select('clearedLines');
  initLine$ = this.select('initLine');
  speed$ = this.select('speed');
  initSpeed$ = this.select('initSpeed');
  max$ = this.select('max');

  isShowLogo$ = combineLatest([this.gameState$, this.select('current')]).pipe(
    switchMap(([state, current]) => {
      const isLoadingOrOver = state === GameState.Loading || state === GameState.Over;
      const isRenderingLogo$ = of(isLoadingOrOver && !current);
      return isLoadingOrOver ? isRenderingLogo$.pipe(delay(1800)) : isRenderingLogo$;
    })
  );

  constructor(protected store: TetrisStore) {
    super(store);
  }

  get raw(): TetrisState {
    return this.getValue();
  }

  get locked(): boolean {
    return this.raw.locked;
  }

  get current() {
    return this.raw.current;
  }

  get next() {
    return this.raw.next;
  }

  get matrix() {
    return this.raw.matrix;
  }

  get canStartGame() {
    return this.raw.gameState !== GameState.Started;
  }

  get isPlaying() {
    return this.raw.gameState === GameState.Started;
  }

  get isPause() {
    return this.raw.gameState === GameState.Paused;
  }

  get isEnableSound(): boolean {
    return !!this.raw.sound;
  }
}
