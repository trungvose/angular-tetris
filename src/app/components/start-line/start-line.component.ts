import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
import { NumberComponent } from '../number/number.component';

@Component({
  selector: 't-start-line',
  standalone: true,
  imports: [NumberComponent, NgIf, AsyncPipe],
  templateUrl: './start-line.component.html',
  styleUrls: ['./start-line.component.scss']
})
export class StartLineComponent {
  hasCurrent$ = this._query.hasCurrent$;
  clearedLines$ = this._query.clearedLines$;
  initLine$ = this._query.initLine$;

  constructor(public _query: TetrisQuery) {}
}
