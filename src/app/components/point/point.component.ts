import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NumberComponent } from '../number/number.component';

const REFRESH_LABEL_INTERVAL = 3000;
@UntilDestroy()
@Component({
  selector: 't-point',
  standalone: true,
  imports: [NumberComponent, NgIf, AsyncPipe],
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  labelAndPoints$: Observable<LabelAndNumber> = this._query.hasCurrent$.pipe(
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
  constructor(private _query: TetrisQuery) {}
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
