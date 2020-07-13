import { Component, OnInit, Input } from '@angular/core';
import { MatrixUtil } from '@trungk18/interface/utils/matrix';
import { DotColor, Dot } from '@trungk18/interface/dot';
import { Block } from '@trungk18/interface/block';

@Component({
  selector: 't-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  isOver = false;
  @Input() matrix: number[][] = MatrixUtil.BlankMatrix;
  @Input() current: Block;

  constructor() {}

  ngOnInit(): void {}

  isFilled(block: DotColor) {
    return Dot.isFilled(block);
  }
}
