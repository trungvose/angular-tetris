export enum BlockType {
  I = 'I',
  L = 'L',
  J = 'J',
  Z = 'Z',
  S = 'S',
  O = 'O',
  T = 'T',
}

export const BlockShape = {
  [BlockType.I]: [[1, 1, 1, 1]],
  [BlockType.L]: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [BlockType.J]: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [BlockType.Z]: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [BlockType.S]: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [BlockType.O]: [
    [1, 1],
    [1, 1],
  ],
  [BlockType.T]: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};
