import { Store } from '@datorama/akita';
import { TetrisState, createInitialState } from '../interface/state/tetris';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TetrisStore extends Store<TetrisState> {
  constructor() {
    super(createInitialState());
  }
}
