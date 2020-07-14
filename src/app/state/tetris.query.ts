import { Injectable } from '@angular/core';
import { TetrisStore } from './tetris.store';
import { Query } from '@datorama/akita';
import { TetrisState } from '../interface/state/tetris';

@Injectable({ providedIn: 'root' })
export class TetrisQuery extends Query<TetrisState> {
  constructor(protected store: TetrisStore) {
    super(store);
  }

  matrix$ = this.select('matrix');
  current$ = this.select('current');
  next$ = this.select('next');
  sound$ = this.select('sound');
  pause$ = this.select('pause');
  points = this.select('points');
  reset$ = this.select('reset');
}
