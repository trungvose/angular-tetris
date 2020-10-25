import { Piece } from '../interface/piece/piece';
import { PieceI } from '../interface/piece/I';
import { PieceJ } from '../interface/piece/J';
import { PieceL } from '../interface/piece/L';
import { PieceO } from '../interface/piece/O';
import { PieceS } from '../interface/piece/S';
import { PieceT } from '../interface/piece/T';
import { PieceZ } from '../interface/piece/Z';
import { Injectable } from '@angular/core';

export const SPAWN_POSITION_X = 4;
export const SPAWN_POSITION_Y = -4;

@Injectable({
  providedIn: 'root'
})
export class PieceFactory {
  private _available: typeof Piece[] = [];
  private _currentBag: typeof Piece[] = [];

  constructor() {
    this._available.push(PieceI);
    this._available.push(PieceJ);
    this._available.push(PieceL);
    this._available.push(PieceO);
    this._available.push(PieceS);
    this._available.push(PieceT);
    this._available.push(PieceZ);
  }

  getRandomPiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    if (this._currentBag.length === 0) {
      this.generateNewBag();
    }
    const nextPiece = this._currentBag.pop();
    return new nextPiece(x, y);
  }

  generateNewBag() {
    this._currentBag = this._available.slice();
    this.shuffleArray(this._currentBag);
  }

  shuffleArray(array: typeof Piece[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
