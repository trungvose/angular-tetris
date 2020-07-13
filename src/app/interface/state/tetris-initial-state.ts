import { TetrisState } from './tetris';
import { MatrixUtil } from '../utils/matrix';

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
