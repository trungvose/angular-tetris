import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PieceFactory } from '@angular-tetris/factory/piece-factory';
import { GameState } from '@angular-tetris/interface/game-state';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { Speed } from '@angular-tetris/interface/speed';
import { LocalStorageService } from '@angular-tetris/services/local-storage.service';

export interface TetrisState {
  matrix: Tile[];
  current: Piece;
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

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AngularTetris' })
export class TetrisStore extends Store<TetrisState> {
  constructor(_pieceFactory: PieceFactory) {
    super(createInitialState(_pieceFactory));
  }
}
