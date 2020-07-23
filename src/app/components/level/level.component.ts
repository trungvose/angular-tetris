import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Speed } from '@trungk18/interface/speed';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';

@Component({
  selector: 't-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  speed$: Observable<Speed>;
  initSpeed$: Observable<Speed>;
  hasCurrent$: Observable<boolean>;

  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.speed$ = this._query.speed$;
    this.hasCurrent$ = this._query.hasCurrent$;
    this.initSpeed$ = this._query.initSpeed$;
  }
}
