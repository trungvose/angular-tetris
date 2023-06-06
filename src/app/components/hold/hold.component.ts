import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-hold',
  standalone: true,
  imports: [NgFor, TileComponent],
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoldComponent {
  private tetrisState = inject(TetrisStateService);

  hold = computed(() =>
    this.tetrisState.hold().next.map((row) => row.map((value) => new Tile(value as TileValue)))
  );
}
