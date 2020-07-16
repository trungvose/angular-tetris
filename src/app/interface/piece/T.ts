import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesT: Shapes = [];
ShapesT[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
];

ShapesT[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
];

ShapesT[PieceRotation.Deg180] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
];

ShapesT[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
];

export class PieceT extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.T;
    this.setShapes(ShapesT);
  }
}
