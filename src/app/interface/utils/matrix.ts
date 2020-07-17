import { EmptyTile } from '../tile/empty-tile';
import { Tile } from '../tile/tile';

export class MatrixUtil {
  static readonly Width = 10;
  static readonly Height = 20;
  static get EmptyBoard(): Tile[] {
    return new Array(this.Width * this.Height).fill(new EmptyTile());
  }

  static getEmptyRow(numberOfLines: number = 1): Tile[] {
    return new Array(this.Width * numberOfLines).fill(new EmptyTile());
  }

  static Points = [100, 300, 700, 1500];
  static SpeedDelay = [800, 650, 500, 370, 250, 160];

  static getSpeedDelay(speed: number) {
    return this.SpeedDelay[speed - 1];
  }
}
