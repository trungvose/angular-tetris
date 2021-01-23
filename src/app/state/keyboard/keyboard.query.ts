import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { KeyboardStore, KeyboardState } from './keyboard.store';

@Injectable({ providedIn: 'root' })
export class KeyboardQuery extends Query<KeyboardState> {
  up$ = this.select('up');
  down$ = this.select('down');
  left$ = this.select('left');
  right$ = this.select('right');
  drop$ = this.select('drop');
  pause$ = this.select('pause');
  sound$ = this.select('sound');
  reset$ = this.select('reset');

  constructor(protected store: KeyboardStore) {
    super(store);
  }
}
