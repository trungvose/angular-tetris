import { PieceRotation, PieceTypes } from './piece-enum';
import { Shape, Shapes } from './shape';
import { MatrixUtil } from '../utils/matrix';

export class Piece {
  x: number;
  y: number;
  rotation = PieceRotation.Deg0;
  type: PieceTypes;
  shape: Shape;
  next: Shape;

  private _shapes: Shapes;
  private _lastConfig: Partial<Piece>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  protected setShapes(shapes: Shapes) {
    this._shapes = shapes;
    this.shape = shapes[this.rotation];
  }

  store(): Piece {
    this._lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape
    };
    return this._newPiece();
  }

  clearStore(): Piece {
    this._lastConfig = null;
    return this._newPiece();
  }

  revert(): Piece {
    if (this._lastConfig) {
      for (const key in this._lastConfig) {
        if (this._lastConfig.hasOwnProperty(key)) {
          this[key] = this._lastConfig[key];
        }
      }
      this._lastConfig = null;
    }
    return this._newPiece();
  }

  rotate(): Piece {
    const keys = Object.keys(this._shapes);
    let idx = keys.indexOf(this.rotation.toString());
    let isTurnOver = idx >= keys.length - 1;
    this.rotation = Number(isTurnOver ? keys[0] : keys[idx + 1]);
    this.shape = this._shapes[this.rotation];
    return this._newPiece();
  }

  moveDown(): Piece {
    this.y++;
    return this._newPiece();
  }

  moveRight(): Piece {
    this.x++;
    return this._newPiece();
  }

  moveLeft(): Piece {
    this.x--;
    return this._newPiece();
  }

  get positionOnGrid(): number[] {
    let positions = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.shape[row][col]) {
          const position = (this.y + row) * MatrixUtil.Width + this.x + col;
          if (position > 0) {
            positions.push(position);
          }
        }
      }
    }
    return positions;
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

  private _newPiece(): Piece {
    let piece = new Piece(this.x, this.y);
    piece.rotation = this.rotation;
    piece.type = this.type;
    piece.next = this.next;
    piece.setShapes(this._shapes);
    piece._lastConfig = this._lastConfig;
    return piece;
  }
}
