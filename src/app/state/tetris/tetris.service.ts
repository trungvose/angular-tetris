import {
  PieceFactory,
  SPAWN_POSITION_X,
  SPAWN_POSITION_Y
} from '@angular-tetris/factory/piece-factory';
import { CallBack } from '@angular-tetris/interface/callback';
import { GameState } from '@angular-tetris/interface/game-state';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { Speed } from '@angular-tetris/interface/speed';
import { EmptyTile } from '@angular-tetris/interface/tile/empty-tile';
import { FilledTile } from '@angular-tetris/interface/tile/filled-tile';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { LocalStorageService } from '@angular-tetris/services/local-storage.service';
import { SoundManagerService } from '@angular-tetris/services/sound-manager.service';
import { Injectable, inject } from '@angular/core';
import { TetrisStateService } from './tetris.state';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  gameInterval: number | null;

  private soundManager = inject(SoundManagerService);
  private pieceFactory = inject(PieceFactory);
  private tetrisState = inject(TetrisStateService);

  start() {
    if (!this.tetrisState.hasCurrent()) {
      this.setCurrentPiece(this.tetrisState.next());
      this.setNext();
    }

    this.tetrisState.updateState({
      points: 0,
      gameState: GameState.Started,
      matrix: MatrixUtil.getStartBoard(this.tetrisState.initLine()),
      speed: this.tetrisState.initSpeed()
    });
    this.stopGameInterval();
    this.auto(MatrixUtil.getSpeedDelay(this.tetrisState.initSpeed()));
    this.setLocked(false);
  }

  auto(delay: number) {
    this.update();

    this.gameInterval = setInterval(() => {
      this.update();
    }, delay);
  }

  resume() {
    if (!this.tetrisState.isPause()) {
      return;
    }

    this.tetrisState.updateState({
      locked: false,
      gameState: GameState.Started
    });
    this.auto(MatrixUtil.getSpeedDelay(this.tetrisState.speed()));
  }

  pause() {
    if (!this.tetrisState.isPlaying()) {
      return;
    }
    this.tetrisState.updateState({
      locked: true,
      gameState: GameState.Paused
    });
    this.stopGameInterval();
  }

  reset() {
    this.tetrisState.resetState({
      sound: this.tetrisState.isEnableSound()
    });
  }

  moveLeft() {
    if (this.tetrisState.locked()) {
      return;
    }
    this.clearPiece();
    this.setCurrentPiece(this.tetrisState.current().store());
    this.setCurrentPiece(this.tetrisState.current().moveLeft());
    if (this.isCollidesLeft) {
      this.setCurrentPiece(this.tetrisState.current().revert());
    }
    this.drawPiece();
  }

  moveRight() {
    if (this.tetrisState.locked()) {
      return;
    }
    this.clearPiece();
    this.setCurrentPiece(this.tetrisState.current().store());
    this.setCurrentPiece(this.tetrisState.current().moveRight());
    if (this.isCollidesRight) {
      this.setCurrentPiece(this.tetrisState.current().revert());
    }
    this.drawPiece();
  }

  rotate() {
    if (this.tetrisState.locked()) {
      return;
    }

    this.clearPiece();
    this.setCurrentPiece(this.tetrisState.current().store());
    this.setCurrentPiece(this.tetrisState.current().rotate());
    while (this.isCollidesRight) {
      this.setCurrentPiece(this.tetrisState.current().moveLeft());
      if (this.isCollidesLeft) {
        this.setCurrentPiece(this.tetrisState.current().revert());
        break;
      }
    }
    this.drawPiece();
  }

  moveDown() {
    this.update();
  }

  drop() {
    if (this.tetrisState.locked()) {
      return;
    }
    while (!this.isCollidesBottom) {
      this.clearPiece();
      this.setCurrentPiece(this.tetrisState.current().store());
      this.setCurrentPiece(this.tetrisState.current().moveDown());
    }
    this.setCurrentPiece(this.tetrisState.current().revert());
    this.drawPiece();
    this.setCanHold(true);
  }

  holdPiece(): void {
    if (this.tetrisState.locked() || !this.tetrisState.canHold()) {
      return;
    }
    this.clearPiece();
    const isHoldNonePiece = this.tetrisState.hold().isNone();
    const newCurrent = isHoldNonePiece ? this.tetrisState.next() : this.tetrisState.hold();
    if (isHoldNonePiece) {
      this.setNext();
    }
    this.setHolded(this.tetrisState.current().reset());
    this.setCurrentPiece(newCurrent);
    this.resetPosition(this.tetrisState.hold());
    this.setCanHold(false);
  }

  toggleSound() {
    this.tetrisState.updateState({
      sound: !this.tetrisState.isEnableSound()
    });
  }

  decreaseLevel() {
    const initSpeed = this.tetrisState.initSpeed();
    const newSpeed = (initSpeed - 1 < 1 ? 6 : initSpeed - 1) as Speed;
    this.tetrisState.updateState({
      initSpeed: newSpeed
    });
  }

  increaseLevel() {
    const initSpeed = this.tetrisState.initSpeed();
    const newSpeed = (initSpeed + 1 > 6 ? 1 : initSpeed + 1) as Speed;
    this.tetrisState.updateState({
      initSpeed: newSpeed
    });
  }

  increaseStartLine() {
    const initLine = this.tetrisState.initLine();
    const startLine = initLine + 1 > 10 ? 1 : initLine + 1;
    this.tetrisState.updateState({
      initLine: startLine
    });
  }

  decreaseStartLine() {
    const initLine = this.tetrisState.initLine();
    const startLine = initLine - 1 < 1 ? 10 : initLine - 1;
    this.tetrisState.updateState({
      initLine: startLine
    });
  }

  private update() {
    if (this.tetrisState.locked()) {
      return;
    }
    this.setLocked(true);
    this.setCurrentPiece(this.tetrisState.current().revert());
    this.clearPiece();
    this.setCurrentPiece(this.tetrisState.current().store());
    this.setCurrentPiece(this.tetrisState.current().moveDown());

    if (this.isCollidesBottom) {
      this.setCurrentPiece(this.tetrisState.current().revert());
      this.markAsSolid();
      this.drawPiece();
      this.clearFullLines();
      this.setCurrentPiece(this.tetrisState.next());
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
    const newMatrix = [...this.tetrisState.matrix()];
    for (let row = MatrixUtil.Height - 1; row >= 0; row--) {
      const pos = row * MatrixUtil.Width;
      const fullRowTiles = newMatrix.slice(pos, pos + MatrixUtil.Width);
      const isFullRow = fullRowTiles.every((x) => x.isSolid);
      if (isFullRow) {
        numberOfClearedLines++;
        const topPortion = this.tetrisState.matrix().slice(0, row * MatrixUtil.Width);
        newMatrix.splice(0, ++row * MatrixUtil.Width, ...MatrixUtil.EmptyRow.concat(topPortion));
        this.setMatrix(newMatrix);
      }
    }
    this.setPointsAndSpeed(numberOfClearedLines);
  }

  private get isGameOver() {
    this.setCurrentPiece(this.tetrisState.current().store());
    this.setCurrentPiece(this.tetrisState.current().moveDown());
    if (this.isCollidesBottom) {
      return true;
    }
    this.setCurrentPiece(this.tetrisState.current().revert());
    return false;
  }

  private onGameOver() {
    this.pause();
    this.soundManager.gameOver();
    const maxPoint = Math.max(this.tetrisState.points(), this.tetrisState.max());
    LocalStorageService.setMaxPoint(maxPoint);
    this.tetrisState.resetState({
      max: maxPoint,
      gameState: GameState.Over,
      sound: this.tetrisState.isEnableSound()
    });
  }

  private get isCollidesBottom(): boolean {
    if (this.tetrisState.current().bottomRow >= MatrixUtil.Height) {
      return true;
    }
    return this.collides();
  }

  private get isCollidesLeft(): boolean {
    if (this.tetrisState.current().leftCol < 0) {
      return true;
    }
    return this.collides();
  }

  private get isCollidesRight(): boolean {
    if (this.tetrisState.current().rightCol >= MatrixUtil.Width) {
      return true;
    }
    return this.collides();
  }

  private collides(): boolean {
    return this.tetrisState.current().positionOnGrid.some((pos) => {
      if (this.tetrisState.matrix()[pos].isSolid) {
        return true;
      }
      return false;
    });
  }

  private drawPiece() {
    this.setCurrentPiece(this.tetrisState.current().clearStore());
    this.loopThroughPiecePosition((position) => {
      const isSolid = this.tetrisState.matrix()[position].isSolid;
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
    this.tetrisState.current().positionOnGrid.forEach((position) => {
      callback(position);
    });
  }

  private setPointsAndSpeed(numberOfClearedLines: number) {
    if (!numberOfClearedLines) {
      return;
    }
    this.soundManager.clear();
    const newLines = this.tetrisState.clearedLines() + numberOfClearedLines;
    const newPoints = this.getPoints(numberOfClearedLines, this.tetrisState.points());
    const newSpeed = this.getSpeed(newLines, this.tetrisState.initSpeed());

    this.tetrisState.updateState({
      points: newPoints,
      clearedLines: newLines,
      speed: newSpeed
    });

    if (newSpeed !== this.tetrisState.speed()) {
      this.stopGameInterval();
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
    const newMatrix = [...this.tetrisState.matrix()];
    newMatrix[pos] = tile;
    this.setMatrix(newMatrix);
  }

  private setNext() {
    this.tetrisState.updateState({
      next: this.pieceFactory.getRandomPiece()
    });
  }

  private setCurrentPiece(piece: Piece) {
    this.tetrisState.updateState({
      current: piece
    });
  }

  private setMatrix(matrix: Tile[]) {
    this.tetrisState.updateState({
      matrix
    });
  }

  private setLocked(locked: boolean) {
    this.tetrisState.updateState({
      locked
    });
  }

  private setHolded(piece: Piece): void {
    this.tetrisState.updateState({
      hold: piece
    });
  }

  private setCanHold(canHoldPiece: boolean) {
    this.tetrisState.updateState({
      canHold: canHoldPiece
    });
  }

  private stopGameInterval() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  }

  private resetPosition(piece: Piece) {
    piece.x = SPAWN_POSITION_X;
    piece.y = SPAWN_POSITION_Y;
  }
}
