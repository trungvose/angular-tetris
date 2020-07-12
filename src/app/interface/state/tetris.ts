import { BlockType, Block } from '../block';
import { KeyboardState } from './keyboard';

export interface TetrisState {
  matrix: number[][];
  next: BlockType;
  current: Block;
  initialSpeed: number;
  currentSpeed: number;
  initialLine: number;
  clearedLines: number;
  sound: boolean;
  pause: boolean;
  points: number;
  isDropping: boolean;
  keyboard: KeyboardState;
}
