import { Injectable } from '@angular/core';
import { TetrisState, TetrisStore } from './tetris.store';
import { Piece } from '@trungk18/interface/piece/piece';
import { PieceFactory } from '@trungk18/factory/piece-factory';
import { Tile } from '@trungk18/interface/tile/tile';
import { EmptyTile } from '@trungk18/interface/tile/empty-tile';
import { CallBack } from '@trungk18/interface/callback';
import { FilledTile } from '@trungk18/interface/tile/filled-tile';
import { timer, Subscription } from 'rxjs';
import { MatrixUtil } from '@trungk18/interface/utils/matrix';
import { GameState } from '@trungk18/interface/game-state';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  _gameInterval: Subscription;

  constructor(private _store: TetrisStore, private _pieceFactory: PieceFactory) {}
  private get _raw(): TetrisState {
    return this._store.getValue();
  }

  private get _locked(): boolean {
    return this._raw.locked;
  }

  private get _current() {
    return this._raw.current;
  }

  private get _next() {
    return this._raw.next;
  }

  private get _matrix() {
    return this._raw.matrix;
  }

  start() {
    if (!this._current) {
      this._setCurrentPiece(this._next);
      this._setNext();
    }
    this._unsubscribe();
    this._gameInterval = timer(0, 500).subscribe(() => {
      this._update();
    });
    this._setLocked(false);
  }

  pause() {
    this._store.update({
      locked: true,
      gameState: GameState.Paused
    });
    this._unsubscribe();
  }

  private _unsubscribe() {
    this._gameInterval && this._gameInterval.unsubscribe();
  }

  private _update() {
    if (this._locked) {
      return;
    }
    this._setLocked(true);
    this._setCurrentPiece(this._current.revert());
    this._clearPiece();
    this._setCurrentPiece(this._current.store());
    this._setCurrentPiece(this._current.moveDown());

    if (this._isCollidesBottom) {
      this._setCurrentPiece(this._current.revert());
      this._drawPiece();
      this._clearFullLines();
      this._setCurrentPiece(this._next);
      this._setNext();
      if (this._isGameOver) {
        this._onGameOver();
      }
    }

    this._drawPiece();
    this._setLocked(false);
  }

  private _clearFullLines() {}

  private get _isGameOver() {
    this._setCurrentPiece(this._current.store());
    this._setCurrentPiece(this._current.moveDown());
    if (this._isCollidesBottom) {
      return true;
    }
    this._setCurrentPiece(this._current.revert());
    return false;
  }

  private _onGameOver() {
    this._store.update({
      gameState: GameState.Over
    });
  }

  private get _isCollidesBottom(): boolean {
    if (this._current.bottomRow >= MatrixUtil.Height) {
      return true;
    }
    return this._collides();
  }

  private _collides(): boolean {
    return this._current.positionOnGrid.some((pos) => {
      if (pos && this._matrix[pos].isFilled) {
        return true;
      }
      return false;
    });
  }

  private _drawPiece() {
    this._setCurrentPiece(this._current.clearStore());
    this._loopThroughPiecePosition((position) => {
      this._updateMatrix(position, new FilledTile());
    });
  }

  private _clearPiece() {
    this._loopThroughPiecePosition((position) => {
      this._updateMatrix(position, new EmptyTile());
    });
  }

  private _loopThroughPiecePosition(callback: CallBack<number>) {
    this._current.positionOnGrid.forEach((position) => {
      callback(position);
    });
  }

  private _updateMatrix(pos: number, tile: Tile) {
    let newMatrix = [...this._matrix];
    newMatrix[pos] = tile;
    this._setMatrix(newMatrix);
  }

  private _setNext() {
    this._store.update({
      next: this._pieceFactory.getRandomPiece()
    });
  }

  private _setCurrentPiece(piece: Piece) {
    this._store.update({
      current: piece
    });
  }

  private _setMatrix(matrix: Tile[]) {
    this._store.update({
      matrix
    });
  }

  private _setLocked(locked: boolean) {
    this._store.update({
      locked
    });
  }
}
