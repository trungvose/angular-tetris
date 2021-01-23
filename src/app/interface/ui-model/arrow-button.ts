export enum ArrowButton { // eslint-disable-line no-shadow
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const ArrowButtonTransform = {
  [ArrowButton.UP]: 'translate(0px, 63px) scale(1, 2)',
  [ArrowButton.DOWN]: 'translate(0,-71px) rotate(180deg) scale(1, 2)',
  [ArrowButton.LEFT]: 'translate(60px, -12px) rotate(270deg) scale(1, 2)',
  [ArrowButton.RIGHT]: 'translate(-60px, -12px) rotate(90deg) scale(1, 2)',
};
