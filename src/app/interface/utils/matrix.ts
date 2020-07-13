import { DotColor } from '../dot';

export class MatrixUtil {
  static NUMBER_OF_COLUMNS = 10;
  static NUMBER_OF_ROWS = 20;
  static BlankLine: number[] = new Array(MatrixUtil.NUMBER_OF_COLUMNS).fill(
    DotColor.EMPTY
  );
  static FillLine: number[] = new Array(MatrixUtil.NUMBER_OF_COLUMNS).fill(
    DotColor.FILLED
  );
  static BlankMatrix: number[][] = new Array(MatrixUtil.NUMBER_OF_ROWS).fill(
    MatrixUtil.BlankLine
  );
}
