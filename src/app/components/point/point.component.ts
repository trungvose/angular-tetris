import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest, of, timer } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { NumberComponent } from '../number/number.component';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

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
  store = inject(TetrisStore);

  labelAndPoints$: Observable<LabelAndNumber> = combineLatest([
    this.store.hasCurrent$,
    this.store.points$,
    this.store.max$
  ]).pipe(
    untilDestroyed(this),
    switchMap(([hasCurrent, points, max]) => {
      if (hasCurrent) {
        return of(new LabelAndNumber('Score', points));
      }
      return timer(0, REFRESH_LABEL_INTERVAL).pipe(
        map((val) => {
          const isOdd = val % 2 === 0;
          return isOdd ? new LabelAndNumber('Score', points) : new LabelAndNumber('Max ', max);
        })
      );
    })
  );
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
