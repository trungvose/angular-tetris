import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PieceFactory } from '@trungk18/factory/piece-factory';
import { GameState } from '@trungk18/interface/game-state';
import { Piece } from '@trungk18/interface/piece/piece';
import { Tile } from '@trungk18/interface/tile/tile';

export interface TetrisState {
  matrix: Tile[];
  current: Piece;
  next: Piece;
  locked: boolean;
  sound: boolean;
  initSpeed: number;
  currentSpeed: number;
  initLine: number;
  clearedLines: number;
  gameState: GameState;
  saved: TetrisState;
}

export function createInitialState(pieceFactory: PieceFactory): TetrisState {
  return {
    matrix: null,
    current: null,
    next: pieceFactory.getRandomPiece(),
    locked: true,
    sound: true,
    initLine: 0,
    clearedLines: 0,
    initSpeed: 1,
    currentSpeed: 1,
    gameState: GameState.Paused,
    saved: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tetris' })
export class TetrisStore extends Store<TetrisState> {
  constructor(_pieceFactory: PieceFactory) {
    super(createInitialState(_pieceFactory));
  }
}
