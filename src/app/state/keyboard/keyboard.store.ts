import { Injectable, InjectionToken } from '@angular/core';
import { booleanAdapter } from '@state-adapt/core/adapters';
import { joinAdapters } from '@state-adapt/core';
import { TetrisKeyboard } from '@angular-tetris/interface/keyboard';
import { adapt } from '@state-adapt/angular';

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

const adapter = joinAdapters<KeyboardState>()({
  up: booleanAdapter,
  down: booleanAdapter,
  left: booleanAdapter,
  right: booleanAdapter,
  pause: booleanAdapter,
  sound: booleanAdapter,
  reset: booleanAdapter,
  drop: booleanAdapter,
  hold: booleanAdapter
})();

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

export const KeyboardStore = new InjectionToken('KeyboardStore', {
  providedIn: 'root',
  factory: () => adapt(['keyboard', createInitialState()], adapter)
});
