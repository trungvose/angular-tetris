import { Injectable, Signal } from '@angular/core';
import { TetrisStore, TetrisState } from './tetris.store';
import { GameState } from '@angular-tetris/interface/game-state';
import { delay, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class TetrisQuery {
  next$ = this.store.select(state => state.next);
  hold$ = this.store.select(state => state.hold);
  matrix$ = this.store.select(state => state.matrix);
  sound$ = this.store.select(state => state.sound);
  gameState$ = this.store.select(state => state.gameState);
  current$ = this.store.select(state => state.current);
  hasCurrent$ = this.store.select(state => !!state.current);
  points$ = this.store.select(state => state.points);
  clearedLines$ = this.store.select(state => state.clearedLines);
  initLine$ = this.store.select(state => state.initLine);
  speed$ = this.store.select(state => state.speed);
  initSpeed$ = this.store.select(state => state.initSpeed);
  max$ = this.store.select(state => state.max);

  isShowLogo$ = combineLatest([toObservable(this.gameState$), toObservable(this.current$)]).pipe(
    switchMap(([state, current]) => {
      const isLoadingOrOver = state === GameState.Loading || state === GameState.Over;
      const isRenderingLogo$ = of(isLoadingOrOver && !current);
      return isLoadingOrOver ? isRenderingLogo$.pipe(delay(1800)) : isRenderingLogo$;
    })
  );

  constructor(protected store: TetrisStore) {}

  get raw(): Signal<TetrisState> {
    return this.store.state;
  }

  get locked(): boolean {
    return this.raw().locked;
  }

  get current() {
    return this.raw().current;
  }

  get next() {
    return this.raw().next;
  }

  get matrix() {
    return this.raw().matrix;
  }

  get canStartGame() {
    return this.raw().gameState !== GameState.Started;
  }

  get hold() {
    return this.raw().hold;
  }

  get canHold() {
    return this.raw().canHold;
  }

  get isPlaying() {
    return this.raw().gameState === GameState.Started;
  }

  get isPause() {
    return this.raw().gameState === GameState.Paused;
  }

  get isEnableSound(): boolean {
    return !!this.raw().sound;
  }
}
