import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const SHAPES_J: Shapes = [];
SHAPES_J[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0]
];

SHAPES_J[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0]
];
SHAPES_J[PieceRotation.Deg180] = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0]
];
SHAPES_J[PieceRotation.Deg270] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 0]
];

export class PieceJ extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.J;
    this.next = [
      [1, 0, 0, 0],
      [1, 1, 1, 0]
    ];
    this.setShapes(SHAPES_J);
  }
}
