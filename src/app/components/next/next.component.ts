import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TileComponent } from '../tile/tile.component';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

@Component({
  selector: 't-next',
  standalone: true,
  imports: [TileComponent, NgFor, AsyncPipe],
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent {
  next$: Observable<Tile[][]> = inject(TetrisStore).next$.pipe(
    map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
  );
}
