import { Piece } from '../interface/piece/piece';
import { PieceDot } from '../interface/piece/Dot';
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
  providedIn: 'root',
})
export class PieceFactory {
  private _available: typeof Piece[];

  constructor() {
    this._available.push(PieceDot);
    this._available.push(PieceI);
    this._available.push(PieceJ);
    this._available.push(PieceL);
    this._available.push(PieceO);
    this._available.push(PieceS);
    this._available.push(PieceT);
    this._available.push(PieceZ);
  }

  getRandomPiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    const idx = Math.floor(Math.random() * this._available.length);
    return new this._available[idx](x, y);
  }
}
