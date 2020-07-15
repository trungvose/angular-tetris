import { PieceRotation } from './piece-enum';
import { Shape, Shapes } from './shape';
import { GridUtil } from '../../utils/grid';
import { threadId } from 'worker_threads';

export class Piece {
  x: number;
  y: number;
  rotation = PieceRotation.Deg0;
  shape: Shape;
  private _shapes: Shapes;
  private _lastConfig: Partial<Piece>;

  constructor(x: number, y: number, shapes: Shapes) {
    this.x = x;
    this.y = y;
    this._shapes = shapes;
    this.shape = shapes[this.rotation];
  }

  get positionOnGrid(): number[] {
    let positions = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.shape[row][col]) {
          const position = (this.y + row) * GridUtil.Width + this.x + col;
          if (position > 0) {
            positions.push(position);
          }
        }
      }
    }
    return positions;
  }

  store() {
    this._lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape,
    };
  }

  clearStore() {
    this._lastConfig = null;
  }

  revert() {
    if (this._lastConfig) {
      for (const x in this._lastConfig) {
        if (this._lastConfig.hasOwnProperty(x)) {
          this[x] = this._lastConfig[x];
        }
      }
      this._lastConfig = null;
    }
  }

  rotate() {
    const keys = Object.keys(this._shapes);
    let idx = keys.indexOf(this.rotation.toString());
    let isTurnOver = idx >= keys.length - 1;
    this.rotation = Number(isTurnOver ? keys[0] : keys[idx + 1]);
    this.shape = this._shapes[this.rotation];
  }

  moveDown() {
    this.y++;
  }

  moveRight() {
    this.x++;
  }

  moveLeft() {
    this.x--;
  }

  get bottomRow() {
    return this.y + 3;
  }

  get rightCol() {
    let col = 3;
    while (col >= 0) {
      for (let row = 0; row <= 3; row++) {
        if (this.shape[row][col]) {
          return this.x + col;
        }
      }
      col--;
    }
  }

  get leftCol() {
    return this.x;
  }
}
