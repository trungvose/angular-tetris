import { Injectable } from '@angular/core';
import { KeyboardStore, KeyboardState } from './keyboard.store';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  constructor(private _store: KeyboardStore) {}

  setKeỵ(keyState: Partial<KeyboardState>) {
    this._store.update(keyState);
  }
}
