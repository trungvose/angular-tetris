import { Piece } from '../piece/piece';
import { PieceDot } from '../piece/Dot';
import { PieceI } from '../piece/I';
import { PieceJ } from '../piece/J';
import { PieceL } from '../piece/L';
import { PieceO } from '../piece/O';
import { PieceS } from '../piece/S';
import { PieceT } from '../piece/T';
import { PieceZ } from '../piece/Z';

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

  getRandomPiece(x: number, y: number): Piece {
    const idx = Math.floor(Math.random() * this._available.length);
    return new this._available[idx](x, y);
  }
}
