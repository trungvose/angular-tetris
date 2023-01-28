import { Piece } from './piece';
import { PieceRotation, PieceTypes } from './piece-enum';
import { Shapes } from './shape';

const NONE_SHAPE: Shapes = [];
NONE_SHAPE[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

export class NonePiece extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.None;
    this.next = [
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.setShapes(NONE_SHAPE);
  }
}
