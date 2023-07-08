import { Injectable } from '@angular/core';
import {
  PieceFactory,
  SPAWN_POSITION_X,
  SPAWN_POSITION_Y
} from '@angular-tetris/factory/piece-factory';
import { CallBack } from '@angular-tetris/interface/callback';
import { GameState } from '@angular-tetris/interface/game-state';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { EmptyTile } from '@angular-tetris/interface/tile/empty-tile';
import { FilledTile } from '@angular-tetris/interface/tile/filled-tile';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { Observable, Subscription, timer } from 'rxjs';
import { TetrisQuery } from './tetris.query';
import { createInitialState, TetrisStore } from './tetris.store';
import { Speed } from '@angular-tetris/interface/speed';
import { SoundManagerService } from '@angular-tetris/services/sound-manager.service';
import { LocalStorageService } from '@angular-tetris/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  gameInterval: Subscription;

  constructor(
    private store: TetrisStore,
    private query: TetrisQuery,
    private soundManager: SoundManagerService,
    private pieceFactory: PieceFactory
  ) {}

  private get locked(): boolean {
    return this.query.locked;
  }

  private get current() {
    return this.query.current;
  }

  private get next() {
    return this.query.next;
  }

  private get matrix() {
    return this.query.matrix;
  }

  private get canHold() {
    return this.query.canHold;
  }

  private get hold() {
    return this.query.hold;
  }

  get hold$() {
    return this.query.hold$$;
  }

  get isShowLogo$(): Observable<boolean> {
    return this.query.isShowLogo$;
  }

  get hasCurrent(): boolean {
    return !!this.current;
  }

  get canStartGame(): boolean {
    return this.query.canStartGame;
  }

  start() {
    if (!this.current) {
      this.setCurrentPiece(this.next);
      this.setNext();
    }
    const { initLine, initSpeed } = this.query.raw();
    this.store.update({
      points: 0,
      gameState: GameState.Started,
      matrix: MatrixUtil.getStartBoard(initLine),
      speed: initSpeed
    });
    this.unsubscribe();
    this.auto(MatrixUtil.getSpeedDelay(initSpeed));
    this.setLocked(false);
  }

  auto(delay: number) {
    this.gameInterval = timer(0, delay).subscribe(() => {
      this.update();
    });
  }

  resume() {
    if (!this.query.isPause) {
      return;
    }
    const { speed } = this.query.raw();
    this.store.update({
      locked: false,
      gameState: GameState.Started
    });
    this.auto(MatrixUtil.getSpeedDelay(speed));
  }

  pause() {
    if (!this.query.isPlaying) {
      return;
    }
    this.store.update({
      locked: true,
      gameState: GameState.Paused
    });
    this.unsubscribe();
  }

  reset() {
    const { sound } = this.query.raw();
    this.store.update({
      ...createInitialState(this.pieceFactory),
      sound
    });
  }

  moveLeft() {
    if (this.locked) {
      return;
    }
    this.clearPiece();
    this.setCurrentPiece(this.current.store());
    this.setCurrentPiece(this.current.moveLeft());
    if (this.isCollidesLeft) {
      this.setCurrentPiece(this.current.revert());
    }
    this.drawPiece();
  }

  moveRight() {
    if (this.locked) {
      return;
    }
    this.clearPiece();
    this.setCurrentPiece(this.current.store());
    this.setCurrentPiece(this.current.moveRight());
    if (this.isCollidesRight) {
      this.setCurrentPiece(this.current.revert());
    }
    this.drawPiece();
  }

  rotate() {
    if (this.locked) {
      return;
    }

    this.clearPiece();
    this.setCurrentPiece(this.current.store());
    this.setCurrentPiece(this.current.rotate());
    while (this.isCollidesRight) {
      this.setCurrentPiece(this.current.moveLeft());
      if (this.isCollidesLeft) {
        this.setCurrentPiece(this.current.revert());
        break;
      }
    }
    this.drawPiece();
  }

  moveDown() {
    this.update();
  }

  drop() {
    if (this.locked) {
      return;
    }
    while (!this.isCollidesBottom) {
      this.clearPiece();
      this.setCurrentPiece(this.current.store());
      this.setCurrentPiece(this.current.moveDown());
    }
    this.setCurrentPiece(this.current.revert());
    this.drawPiece();
    this.setCanHold(true);
  }

  holdPiece(): void {
    if (this.locked || !this.canHold) {
      return;
    }
    this.clearPiece();
    const isHoldNonePiece = this.hold.isNone();
    const newCurrent = isHoldNonePiece ? this.next : this.hold;
    if (isHoldNonePiece) {
      this.setNext();
    }
    this.setHolded(this.current.reset());
    this.setCurrentPiece(newCurrent);
    this.resetPosition(this.hold);
    this.setCanHold(false);
  }

  setSound() {
    const sound = this.query.raw().sound;
    this.store.update({
      sound: !sound
    });
  }

  decreaseLevel() {
    const { initSpeed } = this.query.raw();
    const newSpeed = (initSpeed - 1 < 1 ? 6 : initSpeed - 1) as Speed;
    this.store.update({
      initSpeed: newSpeed
    });
  }

  increaseLevel() {
    const { initSpeed } = this.query.raw();
    const newSpeed = (initSpeed + 1 > 6 ? 1 : initSpeed + 1) as Speed;
    this.store.update({
      initSpeed: newSpeed
    });
  }

  increaseStartLine() {
    const { initLine } = this.query.raw();
    const startLine = initLine + 1 > 10 ? 1 : initLine + 1;
    this.store.update({
      initLine: startLine
    });
  }

  decreaseStartLine() {
    const { initLine } = this.query.raw();
    const startLine = initLine - 1 < 1 ? 10 : initLine - 1;
    this.store.update({
      initLine: startLine
    });
  }

  private update() {
    if (this.locked) {
      return;
    }
    this.setLocked(true);
    this.setCurrentPiece(this.current.revert());
    this.clearPiece();
    this.setCurrentPiece(this.current.store());
    this.setCurrentPiece(this.current.moveDown());

    if (this.isCollidesBottom) {
      this.setCurrentPiece(this.current.revert());
      this.markAsSolid();
      this.drawPiece();
      this.clearFullLines();
      this.setCurrentPiece(this.next);
      this.setNext();
      this.setCanHold(true);
      if (this.isGameOver) {
        this.onGameOver();
        return;
      }
    }

    this.drawPiece();
    this.setLocked(false);
  }

  private clearFullLines() {
    let numberOfClearedLines = 0;
    const newMatrix = [...this.matrix];
    for (let row = MatrixUtil.Height - 1; row >= 0; row--) {
      const pos = row * MatrixUtil.Width;
      const fullRowTiles = newMatrix.slice(pos, pos + MatrixUtil.Width);
      const isFullRow = fullRowTiles.every((x) => x.isSolid);
      if (isFullRow) {
        numberOfClearedLines++;
        const topPortion = this.matrix.slice(0, row * MatrixUtil.Width);
        newMatrix.splice(0, ++row * MatrixUtil.Width, ...MatrixUtil.EmptyRow.concat(topPortion));
        this.setMatrix(newMatrix);
      }
    }
    this.setPointsAndSpeed(numberOfClearedLines);
  }

  private get isGameOver() {
    this.setCurrentPiece(this.current.store());
    this.setCurrentPiece(this.current.moveDown());
    if (this.isCollidesBottom) {
      return true;
    }
    this.setCurrentPiece(this.current.revert());
    return false;
  }

  private onGameOver() {
    this.pause();
    this.soundManager.gameOver();
    const { points, max, sound } = this.query.raw();
    const maxPoint = Math.max(points, max);
    LocalStorageService.setMaxPoint(maxPoint);
    this.store.update({
      ...createInitialState(this.pieceFactory),
      max: maxPoint,
      gameState: GameState.Over,
      sound
    });
  }

  private get isCollidesBottom(): boolean {
    if (this.current.bottomRow >= MatrixUtil.Height) {
      return true;
    }
    return this.collides();
  }

  private get isCollidesLeft(): boolean {
    if (this.current.leftCol < 0) {
      return true;
    }
    return this.collides();
  }

  private get isCollidesRight(): boolean {
    if (this.current.rightCol >= MatrixUtil.Width) {
      return true;
    }
    return this.collides();
  }

  private collides(): boolean {
    return this.current.positionOnGrid.some((pos) => {
      if (this.matrix[pos].isSolid) {
        return true;
      }
      return false;
    });
  }

  private drawPiece() {
    this.setCurrentPiece(this.current.clearStore());
    this.loopThroughPiecePosition((position) => {
      const isSolid = this.matrix[position].isSolid;
      this.updateMatrix(position, new FilledTile(isSolid));
    });
  }

  private markAsSolid() {
    this.loopThroughPiecePosition((position) => {
      this.updateMatrix(position, new FilledTile(true));
    });
  }

  private clearPiece() {
    this.loopThroughPiecePosition((position) => {
      this.updateMatrix(position, new EmptyTile());
    });
  }

  private loopThroughPiecePosition(callback: CallBack<number>) {
    this.current.positionOnGrid.forEach((position) => {
      callback(position);
    });
  }

  private setPointsAndSpeed(numberOfClearedLines: number) {
    if (!numberOfClearedLines) {
      return;
    }
    this.soundManager.clear();
    const { points, clearedLines, speed, initSpeed } = this.query.raw();
    const newLines = clearedLines + numberOfClearedLines;
    const newPoints = this.getPoints(numberOfClearedLines, points);
    const newSpeed = this.getSpeed(newLines, initSpeed);

    this.store.update({
      points: newPoints,
      clearedLines: newLines,
      speed: newSpeed
    });

    if (newSpeed !== speed) {
      this.unsubscribe();
      this.auto(MatrixUtil.getSpeedDelay(newSpeed));
    }
  }

  private getSpeed(totalLines: number, initSpeed: number): Speed {
    const addedSpeed = Math.floor(totalLines / MatrixUtil.Height);
    let newSpeed = (initSpeed + addedSpeed) as Speed;
    newSpeed = newSpeed > 6 ? 6 : newSpeed;
    return newSpeed;
  }

  private getPoints(numberOfClearedLines: number, points: number): number {
    const addedPoints = MatrixUtil.Points[numberOfClearedLines - 1];
    const newPoints = points + addedPoints;
    return newPoints > MatrixUtil.MaxPoint ? MatrixUtil.MaxPoint : newPoints;
  }

  private updateMatrix(pos: number, tile: Tile) {
    const newMatrix = [...this.matrix];
    newMatrix[pos] = tile;
    this.setMatrix(newMatrix);
  }

  private setNext() {
    this.store.update({
      next: this.pieceFactory.getRandomPiece()
    });
  }

  private setCurrentPiece(piece: Piece) {
    this.store.update({
      current: piece
    });
  }

  private setMatrix(matrix: Tile[]) {
    this.store.update({
      matrix
    });
  }

  private setLocked(locked: boolean) {
    this.store.update({
      locked
    });
  }

  private setHolded(piece: Piece): void {
    this.store.update({
      hold: piece
    });
  }

  private setCanHold(canHoldPiece: boolean) {
    this.store.update({
      canHold: canHoldPiece
    });
  }

  private unsubscribe() {
    if (this.gameInterval) {
      this.gameInterval.unsubscribe();
    }
  }

  private resetPosition(piece: Piece) {
    piece.x = SPAWN_POSITION_X;
    piece.y = SPAWN_POSITION_Y;
  }
}
