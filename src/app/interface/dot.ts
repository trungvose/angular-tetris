export class Dot {
  static isFilled(dot: DotColor) {
    return dot === DotColor.FILLED;
  }

  static isAnimated(dot: DotColor) {
    return dot === DotColor.ANIMATED;
  }
}

export enum DotColor {
  EMPTY,
  FILLED,
  ANIMATED,
}
