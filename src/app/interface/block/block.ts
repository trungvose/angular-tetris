import { BlockType } from './block-type';

export class Block {
  type: BlockType;
  rotateIndex: number;
  shape: number[][];
  timeStamp: number;
  xy: number[];
}
