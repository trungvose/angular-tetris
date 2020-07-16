import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesJ: Shapes = [];
ShapesJ[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
];

ShapesJ[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
];
ShapesJ[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];
ShapesJ[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 0],
];

export class PieceJ extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.J;
    this.setShapes(ShapesJ);
  }
}
