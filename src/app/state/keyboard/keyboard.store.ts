import { Injectable } from '@angular/core';
import { FeatureStore } from '@mini-rx/signal-store';

export interface KeyboardState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  pause: boolean;
  sound: boolean;
  reset: boolean;
  drop: boolean;
  hold: boolean;
}

export const createInitialState = (): KeyboardState => ({
  up: false,
  down: false,
  left: false,
  right: false,
  pause: false,
  sound: false,
  reset: false,
  drop: false,
  hold: false
});

@Injectable({ providedIn: 'root' })
export class KeyboardStore extends FeatureStore<KeyboardState> {
  constructor() {
    super('AngularTetrisKeyboard', createInitialState());
  }
}
