import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilledTile } from '@angular-tetris/interface/tile/filled-tile';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-screen-decoration',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './screen-decoration.component.html',
  styleUrls: ['./screen-decoration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreenDecorationComponent {
  title = 'Angular Tetris';
  filled = new FilledTile();
}
