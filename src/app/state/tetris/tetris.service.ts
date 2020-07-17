import { Injectable } from '@angular/core';
import { PieceFactory } from '@trungk18/factory/piece-factory';
import { CallBack } from '@trungk18/interface/callback';
import { GameState } from '@trungk18/interface/game-state';
import { Piece } from '@trungk18/interface/piece/piece';
import { EmptyTile } from '@trungk18/interface/tile/empty-tile';
import { FilledTile } from '@trungk18/interface/tile/filled-tile';
import { Tile } from '@trungk18/interface/tile/tile';
import { MatrixUtil } from '@trungk18/interface/utils/matrix';
import { Subscription, timer } from 'rxjs';
import { TetrisQuery } from './tetris.query';
import { createInitialState, TetrisStore } from './tetris.store';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  _gameInterval: Subscription;

  constructor(
    private _store: TetrisStore,
    private _query: TetrisQuery,
    private _pieceFactory: PieceFactory
  ) {}

  private get _locked(): boolean {
    return this._query.locked;
  }

  private get _current() {
    return this._query.current;
  }

  private get _next() {
    return this._query.next;
  }

  private get _matrix() {
    return this._query.matrix;
  }

  start() {
    if (!this._current) {
      this._setCurrentPiece(this._next);
      this._setNext();
    }
    this._store.update({
      gameState: GameState.Started
    });
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

  reset() {
    this._store.update(createInitialState(this._pieceFactory));
  }

  moveLeft() {
    if (this._locked) {
      return;
    }
    this._clearPiece();
    this._setCurrentPiece(this._current.store());
    this._setCurrentPiece(this._current.moveLeft());
    if (this._isCollidesLeft) {
      this._setCurrentPiece(this._current.revert());
    }
    this._drawPiece();
  }

  moveRight() {
    if (this._locked) {
      return;
    }
    this._clearPiece();
    this._setCurrentPiece(this._current.store());
    this._setCurrentPiece(this._current.moveRight());
    if (this._isCollidesRight) {
      this._setCurrentPiece(this._current.revert());
    }
    this._drawPiece();
  }

  rotate() {
    if (this._locked) {
      return;
    }

    this._clearPiece();
    this._setCurrentPiece(this._current.store());
    this._setCurrentPiece(this._current.rotate());
    while (this._isCollidesRight) {
      this._setCurrentPiece(this._current.moveLeft());
      if (this._isCollidesLeft) {
        this._setCurrentPiece(this._current.revert());
        break;
      }
    }
    this._drawPiece();
  }

  moveDown() {
    this._update();
  }

  setSound() {
    let sound = this._query.raw.sound;
    this._store.update({
      sound: !sound
    });
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
        return;
      }
    }

    this._drawPiece();
    this._setLocked(false);
  }

  private _clearFullLines() {
    for (let row = MatrixUtil.Height - 1; row >= 0; row--) {
      let isFull = true;
      for (let col = 0; col < MatrixUtil.Width; col++) {
        let pos = row * MatrixUtil.Width + col;
        if (!this._matrix[pos].isFilled) {
          isFull = false;
          break;
        }
      }

      if (isFull) {
        let topPortion = this._matrix.slice(0, row * MatrixUtil.Width);
        let newMatrix = [...this._matrix];
        newMatrix.splice(
          0,
          (row + 1) * MatrixUtil.Width,
          ...[...MatrixUtil.EmptyRow, ...topPortion]
        );
        this._setMatrix(newMatrix);
      }
    }
  }

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
    this.pause();
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

  private get _isCollidesLeft(): boolean {
    if (this._current.leftCol < 0) {
      return true;
    }
    return this._collides();
  }

  private get _isCollidesRight(): boolean {
    if (this._current.rightCol >= MatrixUtil.Width) {
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

  private _unsubscribe() {
    this._gameInterval && this._gameInterval.unsubscribe();
  }
}
