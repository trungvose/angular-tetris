import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NumberComponent } from '../number/number.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

const REFRESH_LABEL_INTERVAL = 3000;
@Component({
  selector: 't-point',
  standalone: true,
  imports: [NumberComponent, NgIf, AsyncPipe],
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  labelAndPoints$: Observable<LabelAndNumber> = toObservable(this.query.hasCurrent$$).pipe(
    takeUntilDestroyed(),
    switchMap((hasCurrent) => {
      if (hasCurrent) {
        return of(new LabelAndNumber('Score', this.query.raw().points));
      }
      return timer(0, REFRESH_LABEL_INTERVAL).pipe(
        map((val) => {
          const isOdd = val % 2 === 0;
          const { points, max } = this.query.raw();
          return isOdd ? new LabelAndNumber('Score', points) : new LabelAndNumber('Max ', max);
        })
      );
    })
  );

  constructor(private query: TetrisQuery) {}
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
