import { Component, OnInit } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';

@Component({
  selector: 't-start-line',
  templateUrl: './start-line.component.html',
  styleUrls: ['./start-line.component.scss']
})
export class StartLineComponent implements OnInit {
  hasCurrent$: Observable<boolean>;
  clearedLines$: Observable<number>;
  initLine$: Observable<number>;
  constructor(public _query: TetrisQuery) {}

  ngOnInit(): void {
    this.hasCurrent$ = this._query.hasCurrent$;
    this.clearedLines$ = this._query.clearedLines$;
    this.initLine$ = this._query.initLine$;
  }
}
