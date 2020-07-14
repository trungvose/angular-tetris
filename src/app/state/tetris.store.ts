import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState, TetrisState } from '../interface/state/tetris';
import { Injectable } from '@angular/core';

@StoreConfig({
  name: 'angular-tetris'
})
@Injectable({
  providedIn: 'root'
})
export class TetrisStore extends Store<TetrisState> {
  constructor() {
    super(createInitialState());
  }
}
