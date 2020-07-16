import { Injectable } from '@angular/core';
import { TetrisState, TetrisStore } from './tetris.store';
import { Piece } from '@trungk18/interface/piece/piece';
import { PieceFactory } from '@trungk18/factory/piece-factory';
import { Tile } from '@trungk18/interface/tile/tile';
import { EmptyTile } from '@trungk18/interface/tile/empty-tile';
import { CallBack } from '@trungk18/interface/callback';
import { FilledTile } from '@trungk18/interface/tile/filled-tile';
import { timer, Subscription } from 'rxjs';

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
    }
    this.clearInterval();
    this._gameInterval = timer(0, 500).subscribe(() => {
      this._update();
    });
    this._setLocked(false);
  }

  clearInterval() {
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
    }

    this._drawPiece();
    this._setLocked(false);
  }

  private get _isCollidesBottom(): boolean {
    return false;
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
