import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Tile, TileValue } from '@trungk18/interface/tile/tile';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-next',
  standalone: true,
  imports: [TileComponent, NgFor, AsyncPipe],
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent {
  next$: Observable<Tile[][]> = this._tetrisQuery.next$.pipe(
    map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
  );
  constructor(private _tetrisQuery: TetrisQuery) {}
}
