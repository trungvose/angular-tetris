import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { TetrisService } from '@angular-tetris/state/tetris/tetris.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-hold',
  standalone: true,
  imports: [NgFor, TileComponent, AsyncPipe],
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.scss']
})
export class HoldComponent {
  hold$: Observable<Tile[][]> = this._tetrisService.hold$.pipe(
    map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
  );

  constructor(private _tetrisService: TetrisService) {}
}
