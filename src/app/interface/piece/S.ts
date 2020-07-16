import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesS: Shapes = [];
ShapesS[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
];

ShapesS[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
];

export class PieceS extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.S;
    this.setShapes(ShapesS);
  }
}
