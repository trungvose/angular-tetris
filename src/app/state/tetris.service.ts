import { Injectable } from '@angular/core';
import { TetrisStore } from './tetris.store';
import { MatrixUtil, MatrixArray } from '@trungk18/interface/utils/matrix';
import { Block } from '@trungk18/interface/block/block';
import { BlockUtil } from '@trungk18/interface/utils/block';
import { TetrisState } from '@trungk18/interface/state/tetris';
import { CallBack } from '@trungk18/interface/callback';
import { DotColor } from '@trungk18/interface/dot';
import { SoundManagerService } from '@trungk18/services/sound-manager.service';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  fallInterval: any;

  get raw(): TetrisState {
    return this._store.getValue();
  }

  constructor(private _store: TetrisStore, private _sound: SoundManagerService) {}

  start() {
    this._sound.start();
    let { initialLine, next, initialSpeed } = this.raw;
    this.setPoints(0, true);
    this.setCurrentSpeed(initialSpeed);
    this._setMatrix(MatrixUtil.getStartMatrix(initialLine));
    this._moveBlock({
      type: next
    });
    this._nextBlock();
    this.auto();
  }

  auto(timeout?: number) {
    timeout = timeout < 0 ? 0 : timeout;
    this._clearTimeout();
    let fallSpeed = timeout || MatrixUtil.getCurrentSpeedTime(this.raw.currentSpeed);
    this.fallInterval = setTimeout(this._fall.bind(this), fallSpeed);
  }

  startOver() {
    this._clearTimeout();
    this._store.update({
      lock: true,
      reset: true,
      pause: false
    });
  }

  endOver() {
    this._store.update({
      matrix: MatrixUtil.BlankMatrix,
      current: null,
      reset: false,
      lock: false,
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
    this._setLock(false);
    this.setClearedLines(linesToClear);
    this.setPoints(MatrixUtil.getPointForCurrentSpeed(this.raw.currentSpeed));
    this.setCurrentSpeed(MatrixUtil.increaseSpeed(this.raw.clearedLines, this.raw.initialSpeed));
  }

  nextRound(matrix: MatrixArray, stopDownTrigger?: CallBack) {
    this._clearTimeout();
    this._setLock(true);
    this._setMatrix(matrix);
    stopDownTrigger && stopDownTrigger();
    this.setPoints(MatrixUtil.getPointForCurrentSpeed(this.raw.currentSpeed));

    if (MatrixUtil.linesToClear(matrix)) {
      this._sound.clear();
      return;
    }
    if (MatrixUtil.isOver(matrix)) {
      this._sound.gameover();
      this.startOver();
      return;
    }

    setTimeout(() => {
      this._setLock(false);
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

  pause(isPause: boolean) {
    this._store.update({
      pause: isPause
    });
    if (isPause) {
      this._clearTimeout();
      return;
    }
    this.auto();
  }

  private _clearTimeout() {
    clearTimeout(this.fallInterval);
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

  private _setLock(lock: boolean) {
    this._store.update({
      lock
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
