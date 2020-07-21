export type TileValue = 0 | 1 | 2;
export class Tile {
  private _value: TileValue;
  isSolid: boolean;

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
