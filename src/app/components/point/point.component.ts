import { Component, OnInit } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';

@Component({
  selector: 't-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
  points$: Observable<number>;
  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.points$ = this._query.points$;
  }
}
