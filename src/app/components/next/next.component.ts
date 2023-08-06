import { Tile, TileValue } from '@angular-tetris/interface/tile/tile';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-next',
  standalone: true,
  imports: [TileComponent, NgFor],
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextComponent {
  private tetrisState = inject(TetrisStateService);

  next = computed(() =>
    this.tetrisState.next().next.map((row) => row.map((value) => new Tile(value as TileValue)))
  );
}
