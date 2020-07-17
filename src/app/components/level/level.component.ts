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
  currentSpeed$: Observable<Speed>;
  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.currentSpeed$ = this._query.currentSpeed$;
  }
}
