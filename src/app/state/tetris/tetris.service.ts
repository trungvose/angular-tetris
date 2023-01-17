import { Injectable, inject } from '@angular/core';
import {
  PieceFactory,
  SPAWN_POSITION_X,
  SPAWN_POSITION_Y
} from '@angular-tetris/factory/piece-factory';
import { CallBack } from '@angular-tetris/interface/callback';
import { Piece } from '@angular-tetris/interface/piece/piece';
import { EmptyTile } from '@angular-tetris/interface/tile/empty-tile';
import { FilledTile } from '@angular-tetris/interface/tile/filled-tile';
import { Tile } from '@angular-tetris/interface/tile/tile';
import { MatrixUtil } from '@angular-tetris/interface/utils/matrix';
import { SoundManagerService } from '@angular-tetris/services/sound-manager.service';
import { Subscription, combineLatest, timer } from 'rxjs';
import { take, pairwise, takeUntil, tap } from 'rxjs/operators';
import { TetrisStore } from './tetris.store';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  gameInterval: Subscription;
  store = inject(TetrisStore);
  hold$ = this.store.hold$;
  isShowLogo$ = this.store.isShowLogo$;
  hasCurrent$ = this.store.hasCurrent$;
  canStartGame$ = this.store.canStartGame$;

  constructor(private soundManager: SoundManagerService, private pieceFactory: PieceFactory) {}

  start() {
    this.store.state$.pipe(take(1)).subscribe(({ current, next }) => {
      if (!current) {
        this.setCurrentPiece(next);
        this.setNext();
      }
      this.store.startGame();
      this.unsubscribe();
      this.store.initSpeed$.pipe(take(1)).subscribe((initSpeed) => {
        this.auto(MatrixUtil.getSpeedDelay(initSpeed));
        this.setLocked(false);
      });
    });
  }

  auto(delay: number) {
    this.gameInterval = timer(0, delay).subscribe(() => {
      this.update();
    });
  }

  resume() {
    combineLatest([this.store.isPaused$, this.store.speed$])
      .pipe(take(1))
      .subscribe(([isPaused, speed]) => {
        if (!isPaused) {
          return;
        }
        this.store.resume();
        this.auto(MatrixUtil.getSpeedDelay(speed));
      });
  }

  pause() {
    this.store.isPlaying$.pipe(take(1)).subscribe((isPlaying) => {
      if (!isPlaying) {
        return;
      }
      this.store.pause();
      this.unsubscribe();
    });
  }

  reset = () => this.store.resetAllButSound(this.pieceFactory);

  moveLeft() {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current }) => {
      if (locked) {
        return;
      }
      this.clearPiece();
      this.setCurrentPiece(current!.store());
      this.setCurrentPiece(current!.moveLeft());
      if (this.isCollidesLeft) {
        this.setCurrentPiece(current!.revert());
      }
      this.drawPiece();
    });
  }

  moveRight() {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current }) => {
      if (locked) {
        return;
      }
      this.clearPiece();
      this.setCurrentPiece(current!.store());
      this.setCurrentPiece(current!.moveRight());
      if (this.isCollidesRight) {
        this.setCurrentPiece(current!.revert());
      }
      this.drawPiece();
    });
  }

  rotate() {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current }) => {
      if (locked) {
        return;
      }

      this.clearPiece();
      this.setCurrentPiece(current!.store());
      this.setCurrentPiece(current!.rotate());
      while (this.isCollidesRight) {
        this.setCurrentPiece(current!.moveLeft());
        if (this.isCollidesLeft) {
          this.setCurrentPiece(current!.revert());
          break;
        }
      }
      this.drawPiece();
    });
  }

  moveDown() {
    this.update();
  }

  drop() {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current }) => {
      if (locked) {
        return;
      }
      while (!this.isCollidesBottom) {
        this.clearPiece();
        this.setCurrentPiece(current!.store());
        this.setCurrentPiece(current!.moveDown());
      }
      this.setCurrentPiece(current!.revert());
      this.drawPiece();
      this.setCanHold(true);
    });
  }

  holdPiece(): void {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current, canHold, next, hold }) => {
      if (locked || !canHold) {
        return;
      }
      this.clearPiece();
      const isHoldNonePiece = hold.isNone();
      const newCurrent = isHoldNonePiece ? next : hold;
      if (isHoldNonePiece) {
        this.setNext();
      }
      this.setHolded(current!.reset());
      this.setCurrentPiece(newCurrent);
      this.resetPosition(hold);
      this.setCanHold(false);
    });
  }

  setSound = this.store.toggleSound;
  decreaseLevel = this.store.decreaseLevel;
  increaseLevel = this.store.increaseLevel;
  increaseStartLine = this.store.increaseStartLine;
  decreaseStartLine = this.store.decreaseStartLine;

  private update() {
    this.store.state$.pipe(take(1)).subscribe(({ locked, current, next }) => {
      if (locked) {
        return;
      }
      this.setLocked(true);
      this.setCurrentPiece(current!.revert());
      this.clearPiece();
      this.setCurrentPiece(current!.store());
      this.setCurrentPiece(current!.moveDown());

      if (this.isCollidesBottom) {
        this.setCurrentPiece(current!.revert());
        this.markAsSolid();
        this.drawPiece();
        this.clearFullLines();
        this.setCurrentPiece(next);
        this.setNext();
        this.setCanHold(true);
        if (this.isGameOver) {
          this.onGameOver();
          return;
        }
      }

      this.drawPiece();
      this.setLocked(false);
    });
  }

  private clearFullLines() {
    this.store.matrix$.pipe(take(1)).subscribe((matrix) => {
      let numberOfClearedLines = 0;
      const newMatrix = [...matrix];
      for (let row = MatrixUtil.Height - 1; row >= 0; row--) {
        const pos = row * MatrixUtil.Width;
        const fullRowTiles = newMatrix.slice(pos, pos + MatrixUtil.Width);
        const isFullRow = fullRowTiles.every((x) => x.isSolid);
        if (isFullRow) {
          numberOfClearedLines++;
          const topPortion = newMatrix.slice(0, pos);
          newMatrix.splice(0, ++row * MatrixUtil.Width, ...MatrixUtil.EmptyRow.concat(topPortion));
          this.setMatrix([...newMatrix]);
        }
      }
      this.setPointsAndSpeed(numberOfClearedLines);
    });
  }

  get current(): Piece {
    let current: Piece;
    this.store.current$.pipe(take(1)).subscribe((c) => (current = c!));
    return current!;
  }

  private get matrix(): Tile[] {
    let matrix: Tile[];
    this.store.matrix$.pipe(take(1)).subscribe((m) => (matrix = m));
    return matrix!;
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
    this.store.endGame(this.pieceFactory);
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
    if (this.current.rightCol! >= MatrixUtil.Width) {
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
    this.store.speed$
      .pipe(pairwise(), take(1), takeUntil(timer(0)))
      .subscribe(([speed, newSpeed]) => {
        if (newSpeed !== speed) {
          this.unsubscribe();
          this.auto(MatrixUtil.getSpeedDelay(newSpeed));
        }
      });
    this.store.handleClearedLines(numberOfClearedLines);
  }

  private updateMatrix(pos: number, tile: Tile) {
    const newMatrix = [...this.matrix];
    newMatrix[pos] = tile;
    this.setMatrix(newMatrix);
  }

  private setNext = () => this.store.setNext(this.pieceFactory.getRandomPiece());
  private setCurrentPiece = this.store.setCurrent;
  private setMatrix = this.store.setMatrix;
  private setLocked = this.store.setLocked;
  private setHolded = this.store.setHold;
  private blockHold = this.store.setCanHoldFalse;
  private unblockHold = this.store.setCanHoldTrue;
  private setCanHold = this.store.setCanHold;

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
