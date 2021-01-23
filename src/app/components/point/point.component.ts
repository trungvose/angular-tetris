import { Component, OnInit } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

const REFRESH_LABEL_INTERVAL = 3000;
@UntilDestroy()
@Component({
  selector: 't-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
  labelAndPoints$: Observable<LabelAndNumber>;
  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.renderLabelAndPoints();
  }

  private renderLabelAndPoints() {
    this.labelAndPoints$ = this._query.hasCurrent$.pipe(
      untilDestroyed(this),
      switchMap((hasCurrent) => {
        if (hasCurrent) {
          return of(new LabelAndNumber('Score', this._query.raw.points));
        }
        return timer(0, REFRESH_LABEL_INTERVAL).pipe(
          map((val) => {
            const isOdd = val % 2 === 0;
            const { points, max } = this._query.raw;
            return isOdd ? new LabelAndNumber('Score', points) : new LabelAndNumber('Max ', max);
          })
        );
      })
    );
  }
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
