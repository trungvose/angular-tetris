import { Tile } from './tile';

export class FilledTile extends Tile {
  constructor(isSolid = false) {
    super(1);
    this.isSolid = isSolid;
  }
}
