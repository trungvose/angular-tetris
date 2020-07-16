import { Component, OnInit } from '@angular/core';
import { MatrixUtil } from '@trungk18/interface/utils/matrix';
import { Tile } from '@trungk18/interface/tile/tile';
@Component({
  selector: 't-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  matrix: Tile[] = MatrixUtil.EmptyBoard;
  constructor() {}

  ngOnInit(): void {}
}
