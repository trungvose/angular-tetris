import { Injectable, computed, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keyboardState = signal<KeyboardState>({
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

  // computed does memorized value so it won't emit if
  // value doesn't change
  up = computed(() => this.keyboardState().up);
  down = computed(() => this.keyboardState().down);
  left = computed(() => this.keyboardState().left);
  right = computed(() => this.keyboardState().right);
  drop = computed(() => this.keyboardState().drop);
  pause = computed(() => this.keyboardState().pause);
  sound = computed(() => this.keyboardState().sound);
  reset = computed(() => this.keyboardState().reset);
  hold = computed(() => this.keyboardState().hold);

  setKeỵ(keyState: Partial<KeyboardState>) {
    this.keyboardState.update((currentKeyState) => ({ ...currentKeyState, ...keyState }));
  }
}
