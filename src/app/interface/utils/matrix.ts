import { EmptyTile } from '../tile/empty-tile';
import { Tile } from '../tile/tile';

export class MatrixUtil {
  static readonly Width = 10;
  static readonly Height = 20;
  static get EmptyBoard(): Tile[] {
    return new Array(this.Width * this.Height).fill(new EmptyTile());
  }

  static get EmptyRow(): Tile[] {
    return new Array(this.Width).fill(new EmptyTile());
  }
}
