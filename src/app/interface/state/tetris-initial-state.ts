import { TetrisState } from './tetris';
import { MatrixUtil } from '../utils/matrix';
import { BlockUtil } from '../utils/block';

export const initialTetrisState: TetrisState = {
  matrix: MatrixUtil.BlankMatrix,
  next: BlockUtil.nextBlock,
  current: null,
  initialSpeed: 1,
  currentSpeed: 1,
  initialLine: 0,
  clearedLines: 0,
  isDropping: false,
  pause: false,
  sound: false,
  reset: false,
  lock: false,
  points: 0,
  keyboard: {
    down: false,
    drop: false,
    left: false,
    music: false,
    pause: false,
    reset: false,
    right: false,
    rotate: false
  }
};
