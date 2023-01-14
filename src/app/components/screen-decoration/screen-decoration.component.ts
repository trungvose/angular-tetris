import { Component } from '@angular/core';
import { FilledTile } from '@trungk18/interface/tile/filled-tile';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 't-screen-decoration',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './screen-decoration.component.html',
  styleUrls: ['./screen-decoration.component.scss']
})
export class ScreenDecorationComponent {
  title = 'Angular Tetris';
  filled = new FilledTile();
}
