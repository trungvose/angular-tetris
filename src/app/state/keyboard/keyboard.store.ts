import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface KeyboardState {
   key: string;
}

export function createInitialState(): KeyboardState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'keyboard' })
export class KeyboardStore extends Store<KeyboardState> {

  constructor() {
    super(createInitialState());
  }

}

