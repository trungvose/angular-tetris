import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyboardQuery } from './keyboard.query';
import { KeyboardStore, KeyboardState } from './keyboard.store';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  constructor(private _store: KeyboardStore, private _query: KeyboardQuery) {}

  setKeỵ(keyState: Partial<KeyboardState>) {
    this._store.update(keyState);
  }

  get drop$(): Observable<boolean> {
    return this._query.drop$;
  }
}
