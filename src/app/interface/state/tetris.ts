import { LocalStorageUtil } from '../utils/local-storage';
import { KeyboardState } from './keyboard';
import { initialTetrisState } from './tetris-initial-state';
import { BlockType } from '../block/block-type';
import { Block } from '../block/block';
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

export function createInitialState() {
  return {
    ...initialTetrisState,
    ...LocalStorageUtil.lastRecord,
  };
}
