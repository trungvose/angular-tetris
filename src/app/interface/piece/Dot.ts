import { Piece } from './piece';
import { Shapes } from './shape';
import { PieceRotation, PieceTypes } from './piece-enum';

const ShapesDot: Shapes = [];
ShapesDot[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0]
];

export class PieceDot extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.Dot;
    this.next = [
      [0, 0, 0, 0],
      [1, 0, 0, 0]
    ];
    this.setShapes(ShapesDot);
  }
}
