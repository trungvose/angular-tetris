import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NumberComponent } from '../number/number.component';

@Component({
  selector: 't-level',
  standalone: true,
  imports: [NgIf, NumberComponent],
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelComponent {
  private tetrisState = inject(TetrisStateService);

  speed = this.tetrisState.speed;
  hasCurrent = this.tetrisState.hasCurrent;
  initSpeed = this.tetrisState.initSpeed;
}
