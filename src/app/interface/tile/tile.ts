export type TileValue = 0 | 1 | 2;
export class Tile {
  public isSolid: boolean;
  private value: TileValue;

  constructor(val: TileValue) {
    this.value = val;
  }

  get isFilled(): boolean {
    return this.value === 1;
  }

  get isAnimated(): boolean {
    return this.value === 2;
  }
}
