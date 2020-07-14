import * as _ from 'lodash';
import { DotColor } from '../dot';
import { Block } from '../block/block';
export type MatrixArray = number[][];

export class MatrixUtil {
  static NumberOfColumns = 10;
  static NumberOfRows = 20;
  static Speeds = [800, 650, 500, 370, 250, 160]; //delay time. slowest to fastest
  static Delays = [50, 60, 70, 80, 90, 100];
  static DefaultPoint = 10;
  static BlankLine: number[] = new Array(MatrixUtil.NumberOfColumns).fill(DotColor.EMPTY);
  static FillLine: number[] = new Array(MatrixUtil.NumberOfColumns).fill(DotColor.FILLED);
  static BlankMatrix: MatrixArray = new Array(MatrixUtil.NumberOfRows).fill(MatrixUtil.BlankLine);
  static get BlankNext(): MatrixArray {
    return [new Array(4).fill(DotColor.EMPTY), new Array(4).fill(DotColor.EMPTY)];
  }
  
  static getCurrentSpeedTime(currentSpeed: number): number {
    return this.Speeds[currentSpeed - 1];
  }

  static deepCopy(matrix: MatrixArray): MatrixArray {
    return _.cloneDeep(matrix);
  }

  static getPointForCurrentSpeed(currentSpeed: number) {
    return this.DefaultPoint + (currentSpeed - 1) * 2; //The higher the speed, the higher the point
  }

  static increaseSpeed(totalLinesCleared: number, initialSpeed: number) {
    let addedSpeed = Math.floor(totalLinesCleared / this.NumberOfRows);
    return initialSpeed + addedSpeed;
  }

  static linesToClear(matrix: MatrixArray): number[] {
    let clearLines: number[] = [];
    matrix.forEach((m, k) => {
      if (m.every((n) => !!n)) {
        clearLines.push(k);
      }
    });
    if (clearLines.length === 0) {
      return null;
    }
    return clearLines;
  }

  static getStartMatrix(startLine: number): MatrixArray {
    let startMatrix: MatrixArray = [];

    for (let i = 0; i < startLine; i++) {
      if (i <= 2) {
        // 0-3
        startMatrix.push(this.getLine(5, 8));
      } else if (i <= 6) {
        // 4-6
        startMatrix.push(this.getLine(4, 9));
      } else {
        // 7-9
        startMatrix.push(this.getLine(3, 9));
      }
    }
    for (let i = 0, len = 20 - startLine; i < len; i++) {
      startMatrix.unshift(this.BlankLine);
    }
    return startMatrix;
  }

  static getLine(min: number, max: number): DotColor[] {
    let count = parseInt(`${(max - min + 1) * Math.random() + min}`, 10);
    let line: DotColor[] = [];
    for (let i = 0; i < count; i++) {
      line.push(DotColor.FILLED);
    }
    for (let i = 0, len = MatrixUtil.NumberOfColumns - count; i < len; i++) {
      let index = parseInt(`${(line.length + 1) * Math.random()}`, 10);
      line.splice(index, 0, DotColor.EMPTY);
    }

    return line;
  }

  static isOver(matrix: MatrixArray): boolean {
    return matrix[0].some((n) => !!n);
  }

  static want(next: Partial<Block>, matrix: MatrixArray): boolean {
    let xy = next.xy;
    let shape = next.shape;
    let horizontal = shape[0].length;
    return shape.every((m, k1) =>
      m.every((n, k2) => {
        if (xy[1] < 0) {
          // left
          return false;
        }
        if (xy[1] + horizontal > 10) {
          // right
          return false;
        }
        if (xy[0] + k1 < 0) {
          // top
          return true;
        }
        if (xy[0] + k1 >= 20) {
          // bottom
          return false;
        }
        if (n) {
          if (matrix[xy[0] + k1][xy[1] + k2]) {
            return false;
          }
          return true;
        }
        return true;
      })
    );
  }
}
