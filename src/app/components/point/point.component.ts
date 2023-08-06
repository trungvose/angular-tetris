import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  private tetrisState = inject(TetrisStateService);

  labelAndPoints$: Observable<LabelAndNumber> = this.tetrisState.current$.pipe(
    untilDestroyed(this),
    map((current) => !!current),
    switchMap((hasCurrent) => {
      if (hasCurrent) {
        return of(new LabelAndNumber('Score', this.tetrisState.points()));
      }
      return timer(0, REFRESH_LABEL_INTERVAL).pipe(
        map((val) => {
          const isOdd = val % 2 === 0;
          const points = this.tetrisState.points();
          const max = this.tetrisState.max();
          return isOdd ? new LabelAndNumber('Score', points) : new LabelAndNumber('Max ', max);
        })
      );
    })
  );
}

class LabelAndNumber {
  constructor(public label: string, public points: number) {}
}
