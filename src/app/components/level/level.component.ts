import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
import { NumberComponent } from '../number/number.component';

@Component({
  selector: 't-level',
  standalone: true,
  imports: [AsyncPipe, NgIf, NumberComponent],
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent  {
  constructor(private _query: TetrisQuery) {}

  speed$ = this._query.speed$;
  hasCurrent$ = this._query.hasCurrent$;
  initSpeed$ = this._query.initSpeed$;
}
