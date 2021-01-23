import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TetrisKeyboard } from '@trungk18/interface/keyboard';

export interface KeyboardState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  pause: boolean;
  sound: boolean;
  reset: boolean;
  drop: boolean;
}

export const createInitialState = (): KeyboardState => ({
  up: false,
  down: false,
  left: false,
  right: false,
  pause: false,
  sound: false,
  reset: false,
  drop: false
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AngularTetrisKeyboard' })
export class KeyboardStore extends Store<KeyboardState> {
  constructor() {
    super(createInitialState());
  }
}
