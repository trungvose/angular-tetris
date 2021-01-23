import { EmptyTile } from '../tile/empty-tile';
import { Tile } from '../tile/tile';
import { FilledTile } from '../tile/filled-tile';

/* eslint-disable @typescript-eslint/naming-convention */
export class MatrixUtil {
  static readonly Width = 10;
  static readonly Height = 20;
  static Points = [100, 300, 700, 1500];
  static MaxPoint = 999999;
  static SpeedDelay = [700, 600, 450, 320, 240, 160];

  static getStartBoard(startLines: number = 0): Tile[] {
    if (startLines === 0) {
      return new Array(this.Width * this.Height).fill(new EmptyTile());
    }
    const startMatrix: Tile[] = [];

    for (let i = 0; i < startLines; i++) {
      if (i <= 2) {
        // 0-3
        startMatrix.push(...this.getRandomFilledRow(5, 8));
      } else if (i <= 6) {
        // 4-6
        startMatrix.push(...this.getRandomFilledRow(4, 9));
      } else {
        // 7-9
        startMatrix.push(...this.getRandomFilledRow(3, 9));
      }
    }

    for (let i = 0, len = 20 - startLines; i < len; i++) {
      startMatrix.unshift(...this.EmptyRow);
    }
    return startMatrix;
  }

  static getRandomFilledRow(min: number, max: number): Tile[] {
    const count = parseInt(`${(max - min + 1) * Math.random() + min}`, 10);
    const line: Tile[] = new Array(count).fill(new FilledTile(true));

    for (let i = 0, len = 10 - count; i < len; i++) {
      const index = parseInt(`${(line.length + 1) * Math.random()}`, 10);
      line.splice(index, 0, new EmptyTile());
    }

    return line;
  }

  static get EmptyRow(): Tile[] {
    return new Array(this.Width).fill(new EmptyTile());
  }

  static get FullRow(): Tile[] {
    return new Array(this.Width).fill(new FilledTile());
  }

  static getSpeedDelay(speed: number) {
    return this.SpeedDelay[speed - 1] ?? this.SpeedDelay[0];
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
