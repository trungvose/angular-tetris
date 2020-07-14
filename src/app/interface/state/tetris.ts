import { LocalStorageUtil } from '../utils/local-storage';
import { KeyboardState } from './keyboard';
import { initialTetrisState } from './tetris-initial-state';
import { BlockType } from '../block/block-type';
import { Block } from '../block/block';
import { MatrixArray } from '../utils/matrix';
export interface TetrisState {
  matrix: MatrixArray;
  next: BlockType;
  current: Block;
  reset: boolean;
  lock: boolean;
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
    ...LocalStorageUtil.lastRecord
  };
}
