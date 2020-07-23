import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesF: Shapes = [];
ShapesF[PieceRotation.Deg0] = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0]
];

export class PieceF extends Piece {
  constructor(x, y) {
    super(x, y);
    this.type = PieceTypes.F;
    this.next = [
      [1, 0, 1, 0],
      [1, 1, 1, 1]
    ];
    this.setShapes(ShapesF)
  }
}
