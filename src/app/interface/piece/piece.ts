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

  private shapes: Shapes;
  private lastConfig: Partial<Piece>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  store(): Piece {
    this.lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape
    };
    return this.newPiece();
  }

  clearStore(): Piece {
    this.lastConfig = null;
    return this.newPiece();
  }

  revert(): Piece {
    if (this.lastConfig) {
      for (const key in this.lastConfig) {
        if (this.lastConfig.hasOwnProperty(key)) {
          this[key] = this.lastConfig[key];
        }
      }
      this.lastConfig = null;
    }
    return this.newPiece();
  }

  rotate(): Piece {
    const keys = Object.keys(this.shapes);
    const idx = keys.indexOf(this.rotation.toString());
    const isTurnOver = idx >= keys.length - 1;
    this.rotation = Number(isTurnOver ? keys[0] : keys[idx + 1]);
    this.shape = this.shapes[this.rotation];
    return this.newPiece();
  }

  reset(): Piece {
    this.rotation = PieceRotation.Deg0;
    this.shape = this.shapes[this.rotation];
    return this.newPiece();
  }

  moveDown(step = 1): Piece {
    this.y = this.y + step;
    return this.newPiece();
  }

  moveRight(): Piece {
    this.x++;
    return this.newPiece();
  }

  moveLeft(): Piece {
    this.x--;
    return this.newPiece();
  }

  isNone(): boolean {
    return this.type === PieceTypes.None;
  }

  get positionOnGrid(): number[] {
    const positions = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.shape[row][col]) {
          const position = (this.y + row) * MatrixUtil.Width + this.x + col;
          if (position >= 0) {
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

  protected setShapes(shapes: Shapes) {
    this.shapes = shapes;
    this.shape = shapes[this.rotation];
  }

  private newPiece(): Piece {
    const piece = new Piece(this.x, this.y);
    piece.rotation = this.rotation;
    piece.type = this.type;
    piece.next = this.next;
    piece.setShapes(this.shapes);
    piece.lastConfig = this.lastConfig;
    return piece;
  }
}
