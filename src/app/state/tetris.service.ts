import { Injectable } from '@angular/core';
import { TetrisStore } from './tetris.store';
import { MatrixUtil, MatrixArray } from '@trungk18/interface/utils/matrix';
import { Block } from '@trungk18/interface/block/block';
import { BlockUtil } from '@trungk18/interface/utils/block';
import { TetrisState } from '@trungk18/interface/state/tetris';
import { CallBack } from '@trungk18/interface/callback';
import { DotColor } from '@trungk18/interface/dot';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  fallInterval: any;

  get raw(): TetrisState {
    return this._store.getValue();
  }

  constructor(private _store: TetrisStore) {}

  start() {
    //TODO music
    let { initialLine, next } = this.raw;
    this.setPoints(0, true);
    this._setMatrix(MatrixUtil.getStartMatrix(initialLine));
    this._moveBlock({
      type: next
    });
    this._nextBlock();
    this.auto();
  }

  auto(timeout?: number) {
    timeout = timeout < 0 ? 0 : timeout;
    clearTimeout(this.fallInterval);
    let fallSpeed = timeout || MatrixUtil.getCurrentSpeedTime(this.raw.currentSpeed);
    this.fallInterval = setTimeout(this._fall.bind(this), fallSpeed);
  }

  startOver() {
    clearTimeout(this.fallInterval);
    this._store.update({
      reset: true,
      pause: false
    });
  }

  endOver() {
    this._store.update({
      matrix: MatrixUtil.BlankMatrix,
      current: null,
      reset: false,
      clearedLines: 0
    });
  }

  clearLines(linesToClear: number[]) {
    let newMatrix = MatrixUtil.deepCopy(this.raw.matrix);
    linesToClear.forEach((n) => {
      newMatrix.splice(n, 1);
      newMatrix.unshift(MatrixUtil.BlankLine);
    });
    this._setMatrix(newMatrix);
    this._moveBlock({
      type: this.raw.next
    });
    this._nextBlock();
    this.auto();
    this.setClearedLines(linesToClear);
    this.setPoints(MatrixUtil.getPointForCurrentSpeed(this.raw.currentSpeed));
    this.setCurrentSpeed(MatrixUtil.increaseSpeed(this.raw.clearedLines, this.raw.initialSpeed));
  }

  nextRound(matrix: MatrixArray, stopDownTrigger?: CallBack) {
    clearTimeout(this.fallInterval);
    this._setMatrix(matrix);
    stopDownTrigger && stopDownTrigger();
    this.setPoints(MatrixUtil.getPointForCurrentSpeed(this.raw.currentSpeed));
    
    if (MatrixUtil.linesToClear(matrix)) {
      //TODO clear
    }
    if (MatrixUtil.isOver(matrix)) {
      //TODO Gameover
    }

    setTimeout(() => {
      this._moveBlock({
        type: this.raw.next
      });
      this._nextBlock();
      this.auto();
    }, 100);
  }

  setCurrentSpeed(speed: number) {
    speed = speed > 6 ? 6 : speed;
    this._store.update({
      currentSpeed: speed
    });
  }

  setPoints(addedPoints: number, reset = false) {
    this._store.update({
      points: reset ? addedPoints : this.raw.points + addedPoints
    });
  }

  setClearedLines(lines: number[]) {
    this._store.update({
      clearedLines: this.raw.clearedLines + lines.length
    });
  }

  private _fall() {
    let { current, matrix, currentSpeed } = this.raw;
    let next = current.fall();
    if (MatrixUtil.want(next, matrix)) {
      this._moveBlock(next);
      this.fallInterval = setTimeout(
        this._fall.bind(this),
        MatrixUtil.getCurrentSpeedTime(currentSpeed)
      );
    } else {
      let newMatrix = MatrixUtil.deepCopy(matrix);
      let { shape, xy } = current;
      shape.forEach((row, k1) =>
        row.forEach((dot, k2) => {
          if (dot && xy[0] + k1 >= 0) {
            let line = newMatrix[xy[0] + k1];
            line[xy[1] + k2] = DotColor.FILLED;
            newMatrix[xy[0] + k1] = line;
          }
        })
      );
      this.nextRound(newMatrix);
    }
  }

  private _setMatrix(matrix: MatrixArray) {
    this._store.update({
      matrix
    });
  }

  private _moveBlock(block: Partial<Block>) {
    this._store.update({
      current: new Block(block)
    });
  }

  private _nextBlock() {
    this._store.update({
      next: BlockUtil.nextBlock
    });
  }
}
