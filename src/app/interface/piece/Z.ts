import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const SHAPES_Z: Shapes = [];
SHAPES_Z[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0]
];

SHAPES_Z[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0]
];

export class PieceZ extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.Z;
    this.next = [
      [1, 1, 0, 0],
      [0, 1, 1, 0]
    ];
    this.setShapes(SHAPES_Z);
  }
}
