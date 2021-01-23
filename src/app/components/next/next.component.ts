import { Component, OnInit } from '@angular/core';
import { Piece } from '@trungk18/interface/piece/piece';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tile, TileValue } from '@trungk18/interface/tile/tile';

@Component({
  selector: 't-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {
  next$: Observable<Tile[][]>;
  constructor(private _tetrisQuery: TetrisQuery) {}

  ngOnInit(): void {
    this.next$ = this._tetrisQuery.next$.pipe(
      map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
    );
  }
}
