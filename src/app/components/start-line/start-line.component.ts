import { Component, OnInit } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';

@Component({
  selector: 't-start-line',
  templateUrl: './start-line.component.html',
  styleUrls: ['./start-line.component.scss']
})
export class StartLineComponent implements OnInit {
  isPlaying$: Observable<boolean>;
  clearedLines$: Observable<number>;
  constructor(public _query: TetrisQuery) {}

  ngOnInit(): void {
    this.isPlaying$ = this._query.isPlaying$;
    this.clearedLines$ = this._query.clearedLines$;
  }
}
