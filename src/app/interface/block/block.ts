import { BlockType, BlockShape, BlockOrigin } from './block-type';
import { MatrixArray } from '../utils/matrix';

export class Block {
  type: BlockType;
  rotateIndex: number;
  shape: MatrixArray;
  timeStamp: number;
  xy: number[];

  constructor(block: Partial<Block>) {
    if (!block) {
      return;
    }

    let { type, rotateIndex, shape, timeStamp, xy } = block;

    this.type = type;
    this.rotateIndex = rotateIndex || 0;
    this.timeStamp = timeStamp || Date.now();
    this.shape = shape || BlockShape[type];

    if (!xy) {
      switch (type) {
        case 'I':
          this.xy = [0, 3];
          break;
        case 'L':
          this.xy = [-1, 4];
          break;
        case 'J':
          this.xy = [-1, 4];
          break;
        case 'Z':
          this.xy = [-1, 4];
          break;
        case 'S':
          this.xy = [-1, 4];
          break;
        case 'O':
          this.xy = [-1, 4];
          break;
        case 'T':
          this.xy = [-1, 4];
          break;
        default:
          break;
      }
    } else {
      this.xy = xy;
    }
  }

  rotate(): Partial<Block> {
    let result = [];
    this.shape.forEach((m) =>
      m.forEach((n, k) => {
        let index = m.length - k - 1;
        if (!result[index]) {
          result[index] = [];
        }

        result[index].push(n);
        let tempK = [...result[index]];
        result[index] = tempK;
      })
    );
    let nextXy = [
      this.xy[0] + BlockOrigin[this.type][this.rotateIndex][0],
      this.xy[1] + BlockOrigin[this.type][this.rotateIndex][1]
    ];
    let nextRotateIndex =
      this.rotateIndex + 1 >= BlockOrigin[this.type].length ? 0 : this.rotateIndex + 1;

    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp
    };
  }

  fall(n = 1): Partial<Block> {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0] + n, this.xy[1]],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now()
    };
  }

  right(): Partial<Block> {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    };
  }

  left(): Partial<Block> {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    };
  }
}
