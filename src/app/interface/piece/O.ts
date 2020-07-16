import { Piece } from './piece';
import { PieceRotation, PieceTypes } from './piece-enum';
import { Shapes } from './shape';

const ShapesO: Shapes = [];
ShapesO[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 1, 0, 0],
];

export class PieceO extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.O;
    this.setShapes(ShapesO);
  }
}
