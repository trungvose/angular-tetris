import { Component, OnInit } from '@angular/core';
import { Tile } from '@trungk18/interface/tile/tile';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';
@Component({
  selector: 't-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  matrix$: Observable<Tile[]>;
  constructor(private _tetrisQuery: TetrisQuery) {}

  ngOnInit(): void {
    this.matrix$ = this._tetrisQuery.matrix$;
  }
}
