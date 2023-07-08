import { Injectable } from '@angular/core';
import { KeyboardStore } from './keyboard.store';

@Injectable({ providedIn: 'root' })
export class KeyboardQuery {
  up$$ = this.store.select(state => state.up);
  down$$ = this.store.select(state => state.down);
  left$$ = this.store.select(state => state.left);
  right$$ = this.store.select(state => state.right);
  drop$$ = this.store.select(state => state.drop);
  pause$$ = this.store.select(state => state.pause);
  sound$$ = this.store.select(state => state.sound);
  reset$$ = this.store.select(state => state.reset);
  hold$$ = this.store.select(state => state.hold);

  constructor(protected store: KeyboardStore) {
  }
}
