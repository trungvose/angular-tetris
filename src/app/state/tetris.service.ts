import { Injectable } from '@angular/core';
import { TetrisStore } from './tetris.store';

@Injectable({ providedIn: 'root' })
export class TetrisService {
  constructor(private _store: TetrisStore) {}

  startOver(){
      
  }
}
