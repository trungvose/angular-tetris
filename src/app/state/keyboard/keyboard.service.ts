import { Injectable, Signal } from '@angular/core';
import { KeyboardQuery } from './keyboard.query';
import { KeyboardStore, KeyboardState } from './keyboard.store';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  get drop$(): Signal<boolean> {
    return this.query.drop$$;
  }

  constructor(private store: KeyboardStore, private query: KeyboardQuery) {}

  setKeỵ(keyState: Partial<KeyboardState>) {
    this.store.update(keyState);
  }
}
