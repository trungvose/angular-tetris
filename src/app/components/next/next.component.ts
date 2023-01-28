import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
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
  next$: Observable<Tile[][]> = this.tetrisQuery.next$.pipe(
    map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
  );

  constructor(private tetrisQuery: TetrisQuery) {}
}
