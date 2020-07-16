import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesZ: Shapes = [];
ShapesZ[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
];

ShapesZ[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
];

export class PieceZ extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.Z;
    this.setShapes(ShapesZ);
  }
}
