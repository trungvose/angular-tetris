import { Component, OnInit } from '@angular/core';
import { BlockType, BlockShape } from '@trungk18/interface/block/block-type';
import { DotColor, Dot } from '@trungk18/interface/dot';
import { TetrisQuery } from '@trungk18/state/tetris.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { MatrixArray, MatrixUtil } from '@trungk18/interface/utils/matrix';
import { map } from 'rxjs/operators';

const anchor = {
  [BlockType.I]: [1, 0],
  [BlockType.L]: [0, 0],
  [BlockType.J]: [0, 0],
  [BlockType.Z]: [0, 0],
  [BlockType.S]: [0, 0],
  [BlockType.O]: [0, 1],
  [BlockType.T]: [0, 0]
};
@UntilDestroy()
@Component({
  selector: 't-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {
  block$: Observable<MatrixArray>;

  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.block$ = this._query.next$
      .pipe(untilDestroyed(this))
      .pipe(map((type) => this.render(type)));
  }

  render(type: BlockType): MatrixArray {
    const shape = BlockShape[type];
    const block = MatrixUtil.BlankNext;
    shape.forEach((row, k1) => {
      row.forEach((dot, k2) => {
        if (this.isFilled(dot)) {
          block[k1 + anchor[type][0]][k2 + anchor[type][1]] = DotColor.FILLED;
        }
      });
    });
    return block;
  }

  isFilled(dot: DotColor) {
    return Dot.isFilled(dot);
  }
}
