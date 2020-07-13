import { Component, OnInit } from '@angular/core';
import { Dot, DotColor } from '@trungk18/interface/dot';
import { Observable, combineLatest } from 'rxjs';
import { TetrisQuery } from '../../state/tetris.query';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 't-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  isOver = false;
  matrix$: Observable<number[][]>;

  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.render();
  }

  render() {
    this.matrix$ = combineLatest([
      this._query.matrix$,
      this._query.current$,
    ]).pipe(
      untilDestroyed(this),
      map(([matrix, current]) => {
        return matrix;
      })
    );
  }

  isFilled(block: DotColor) {
    return Dot.isFilled(block);
  }
}
