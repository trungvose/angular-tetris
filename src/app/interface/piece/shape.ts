import { PieceTypes } from './piece-enum';

export type Shape = number[][];

export interface Shapes {
  [key: string]: Shape;
}
