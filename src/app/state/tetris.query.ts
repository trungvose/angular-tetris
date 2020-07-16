import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TetrisStore, TetrisState } from './tetris.store';

@Injectable({ providedIn: 'root' })
export class TetrisQuery extends Query<TetrisState> {
  constructor(protected store: TetrisStore) {
    super(store);
  }

  matrix$ = this.select('matrix');
  sound$ = this.select('sound');
  gameState$ = this.select('gameState');
}
