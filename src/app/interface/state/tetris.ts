import { BlockType, Block } from '../block';
import { KeyboardState } from './keyboard';
import { MatrixUtil } from '../utils/matrix';
import { LocalStorageUtil } from '../utils/local-storage';
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

export const initialTetrisState: TetrisState = {
  matrix: MatrixUtil.BlankMatrix,
  next: null,
  current: null,
  initialSpeed: 1,
  currentSpeed: 1,
  initialLine: 0,
  clearedLines: 0,
  isDropping: false,
  pause: false,
  sound: false,
  points: 0,
  keyboard: {
    down: false,
    drop: false,
    left: false,
    music: false,
    pause: false,
    reset: false,
    right: false,
    rotate: false,
  },
};

export function createInitialState() {
  return {
    ...initialTetrisState,
    ...LocalStorageUtil.lastRecord,
  };
}
