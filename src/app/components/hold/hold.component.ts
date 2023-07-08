import { AsyncPipe, NgFor } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { TetrisService } from '@angular-tetris/state/tetris/tetris.service';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-hold',
  standalone: true,
  imports: [NgFor, TileComponent, AsyncPipe],
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.scss']
})
export class HoldComponent {
  hold$: Signal<Tile[][]> = computed(() => {
    return this.tetrisService.hold$().next.map((row) => row.map((value) => new Tile(value as TileValue)))
  })

  constructor(private tetrisService: TetrisService) {}
}
