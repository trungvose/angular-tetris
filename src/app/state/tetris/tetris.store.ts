import { InjectionToken, inject } from '@angular/core';
import { PieceFactory } from '@angular-tetris/factory/piece-factory';
import { GameState } from '@angular-tetris/interface/game-state';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { Speed } from '@angular-tetris/interface/speed';
import { LocalStorageService } from '@angular-tetris/services/local-storage.service';
import { adapt } from '@state-adapt/angular';
import { createAdapter, joinAdapters } from '@state-adapt/core';
import { booleanAdapter, numberAdapter } from '@state-adapt/core/adapters';
import { delay, switchMap } from 'rxjs/operators';

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
  saved: TetrisState | null;
  max: number;
}

export const createInitialState = (pieceFactory: PieceFactory): TetrisState => ({
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

const adapter = joinAdapters<TetrisState>()({
  matrix: createAdapter<Tile[]>()({}),
  current: createAdapter<Piece | null>()({}),
  next: createAdapter<Piece>()({}),
  hold: createAdapter<Piece>()({}),
  canHold: booleanAdapter,
  points: numberAdapter,
  locked: booleanAdapter,
  sound: booleanAdapter,
  initSpeed: createAdapter<Speed>()({}),
  speed: createAdapter<Speed>()({}),
  initLine: numberAdapter,
  clearedLines: numberAdapter,
  gameState: createAdapter<GameState>()({}),
  saved: createAdapter<TetrisState | null>()({}),
  max: numberAdapter
})({
  hasCurrent: (s) => !!s.current,
  muted: (s) => !s.sound,
  canStartGame: (s) => s.gameState !== GameState.Started,
  isPlaying: (s) => s.gameState === GameState.Started,
  isPaused: (s) => s.gameState === GameState.Paused,
  isEnableSound: (s) => s.sound,
  maxPoints: (s) => Math.max(s.points, s.max),
  isLoadingOrOver: (s) => s.gameState === GameState.Loading || s.gameState === GameState.Over
})({
  isRendering: (s) => s.isLoadingOrOver && !s.current
})(([selectors]) => ({
  startGame: (state) => ({
    ...state,
    points: 0,
    gameState: GameState.Started,
    matrix: MatrixUtil.getStartBoard(state.initLine),
    speed: state.initSpeed
  }),
  endGame: (state, piece: PieceFactory) => {
    const max = selectors.maxPoints(state);
    LocalStorageService.setMaxPoint(max);
    return {
      ...createInitialState(piece),
      gameState: GameState.Over,
      max,
      sound: state.sound
    };
  },
  pause: (state) => ({
    ...state,
    locked: true,
    gameState: GameState.Paused
  }),
  resume: (state) => ({
    ...state,
    locked: false,
    gameState: GameState.Started
  }),
  resetAllButSound: (state, piece: PieceFactory) => ({
    ...createInitialState(piece),
    sound: state.sound
  }),
  decreaseLevel: (state) => ({
    ...state,
    initSpeed: (state.initSpeed - 1 < 1 ? 6 : state.initSpeed - 1) as Speed
  }),
  increaseLevel: (state) => ({
    ...state,
    initSpeed: (state.initSpeed + 1 > 6 ? 1 : state.initSpeed + 1) as Speed
  }),
  decreaseStartLine: (state) => ({
    ...state,
    initLine: state.initLine - 1 < 1 ? 10 : state.initLine - 1
  }),
  increaseStartLine: (state) => ({
    ...state,
    initLine: state.initLine + 1 > 10 ? 1 : state.initLine + 1
  }),
  handleClearedLines: (state, newClearedLines: number) => {
    const { points, clearedLines, speed, initSpeed } = state;
    const totalLines = clearedLines + newClearedLines;

    // newPoints
    const addedPoints = MatrixUtil.Points[newClearedLines - 1];
    const newPointsUncapped = points + addedPoints;
    const newPoints =
      newPointsUncapped > MatrixUtil.MaxPoint ? MatrixUtil.MaxPoint : newPointsUncapped;

    // newSpeed
    const addedSpeed = Math.floor(totalLines / MatrixUtil.Height);
    let newSpeed = (initSpeed + addedSpeed) as Speed;
    newSpeed = newSpeed > 6 ? 6 : newSpeed;

    return {
      ...state,
      points: newPoints,
      clearedLines: totalLines,
      speed: newSpeed
    };
  }
}))();

export const TetrisStore = new InjectionToken('TetrisStore', {
  providedIn: 'root',
  factory: () => {
    const store = adapt(['tetris', createInitialState(inject(PieceFactory))], adapter);
    const isRenderingLogo$ = store.isRendering$;

    return {
      ...store,
      isShowLogo$: store.isLoadingOrOver$.pipe(
        switchMap((isLoadingOrOver) =>
          isLoadingOrOver ? isRenderingLogo$.pipe(delay(1800)) : isRenderingLogo$
        )
      )
    };
  }
});
