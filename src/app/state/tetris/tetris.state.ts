import { PieceFactory } from '@angular-tetris/factory/piece-factory';
import { GameState } from '@angular-tetris/interface/game-state';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { Speed } from '@angular-tetris/interface/speed';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { LocalStorageService } from '@angular-tetris/services/local-storage.service';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, delay, of, switchMap } from 'rxjs';

export interface TetrisState {
  matrix: Tile[];
  current: Piece | null;
  next: Piece;
  hold: Piece;
  canHold: boolean;
  points: number;
  locked: boolean;
  sound: boolean;
  initSpeed: Speed;
  speed: Speed;
  initLine: number;
  clearedLines: number;
  gameState: GameState;
  saved: TetrisState;
  max: number;
}

const createInitialState = (pieceFactory: PieceFactory): TetrisState => ({
  matrix: MatrixUtil.getStartBoard(),
  current: null,
  next: pieceFactory.getRandomPiece(),
  hold: pieceFactory.getNonePiece(),
  canHold: true,
  points: 0,
  locked: true,
  sound: true,
  initLine: 0,
  clearedLines: 0,
  initSpeed: 1,
  speed: 1,
  gameState: GameState.Loading,
  saved: null,
  max: LocalStorageService.maxPoint
});

const isObjectShallowEqual = (a: any, b: any) => a === b;

@Injectable({ providedIn: 'root' })
export class TetrisStateService {
  private pieceFactory = inject(PieceFactory);
  private tetrisState = signal<TetrisState>(createInitialState(this.pieceFactory));

  next = computed<Piece>(() => this.tetrisState().next, {
    equal: isObjectShallowEqual
  });
  hold = computed<Piece>(() => this.tetrisState().hold, {
    equal: isObjectShallowEqual
  });
  matrix = computed<Tile[]>(() => this.tetrisState().matrix, {
    equal: isObjectShallowEqual
  });
  current = computed<Piece>(() => this.tetrisState().current, {
    equal: isObjectShallowEqual
  });
  isEnableSound = computed(() => this.tetrisState().sound);
  gameState = computed(() => this.tetrisState().gameState);
  hasCurrent = computed(() => !!this.current());
  points = computed(() => this.tetrisState().points);
  clearedLines = computed(() => this.tetrisState().clearedLines);
  initLine = computed(() => this.tetrisState().initLine);
  speed = computed(() => this.tetrisState().speed);
  initSpeed = computed(() => this.tetrisState().initSpeed);
  max = computed(() => this.tetrisState().max);
  canStartGame = computed(() => this.gameState() !== GameState.Started);
  isPlaying = computed(() => this.gameState() === GameState.Started);
  isPause = computed(() => this.gameState() === GameState.Paused);
  locked = computed(() => this.tetrisState().locked);
  canHold = computed(() => this.tetrisState().canHold);

  gameState$ = toObservable(this.gameState);
  matrix$ = toObservable(this.matrix);
  current$ = toObservable(this.current);

  isShowLogo$ = combineLatest([this.gameState$, this.current$]).pipe(
    switchMap(([state, current]) => {
      const isLoadingOrOver = state === GameState.Loading || state === GameState.Over;
      const isRenderingLogo$ = of(isLoadingOrOver && !current);
      return isLoadingOrOver ? isRenderingLogo$.pipe(delay(1800)) : isRenderingLogo$;
    })
  );

  updateState(updatedState: Partial<TetrisState>) {
    this.tetrisState.update((currentState) => ({
      ...currentState,
      ...updatedState
    }));
  }

  resetState(updatedState: Partial<TetrisState>) {
    this.tetrisState.set({
      ...createInitialState(this.pieceFactory),
      ...updatedState
    });
  }
}
