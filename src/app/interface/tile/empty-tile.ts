import { Tile } from './tile';

export class EmptyTile extends Tile {
  constructor() {
    super(0);
    this.isSolid = false;
  }
}
