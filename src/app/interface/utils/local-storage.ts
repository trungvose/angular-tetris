import { TetrisState, initialTetrisState } from '../state/tetris';

const StorageKey = 'ANGULAR_TETRIS_TRUNG_VO';

export class LocalStorageUtil {
  static get lastRecord(): TetrisState {
    let lastState = initialTetrisState;
    if (!window.localStorage || !window.btoa) {
      return lastState;
    }
    let storage = window.localStorage.getItem(StorageKey);
    if (!storage) {
      return lastState;
    }

    try {
      let decodedText = decodeURIComponent(atob(storage));
      lastState = JSON.parse(decodedText);
    } catch (error) {}
    return lastState;
  }
}
