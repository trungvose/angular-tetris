const ANGULAR_TETRIS_STORAGE_KEY = 'ANGULAR_TETRIS';
export class LocalStorageService {
  constructor() {}

  static setMaxPoint(max: number) {
    localStorage.setItem(ANGULAR_TETRIS_STORAGE_KEY, `${max}`);
  }

  static get maxPoint(): number {
    const max = parseInt(localStorage.getItem(ANGULAR_TETRIS_STORAGE_KEY));
    return Number.isInteger(max) ? max : 0;
  }
}
