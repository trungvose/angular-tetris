export type TileValue = 0 | 1 | 2;
export class Tile {
  public isSolid: boolean;
  private _value: TileValue;

  constructor(val: TileValue) {
    this._value = val;
  }
  get isFilled(): boolean {
    return this._value === 1;
  }

  get isAnimated(): boolean {
    return this._value === 2;
  }
}
