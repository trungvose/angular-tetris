export class MatrixUtil {
  static NUMBER_OF_COLUMNS = 10;
  static NUMBER_OF_ROWS = 20;
  static BlankLine: number[] = new Array(MatrixUtil.NUMBER_OF_COLUMNS).fill(0);
  static FillLine: number[] = new Array(MatrixUtil.NUMBER_OF_COLUMNS).fill(1);
  static BlankMatrix: number[][] = new Array(MatrixUtil.NUMBER_OF_ROWS).fill(
    MatrixUtil.BlankLine
  );
}
