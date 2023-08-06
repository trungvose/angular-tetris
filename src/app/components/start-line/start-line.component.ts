import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NumberComponent } from '../number/number.component';

@Component({
  selector: 't-start-line',
  standalone: true,
  imports: [NumberComponent, NgIf],
  templateUrl: './start-line.component.html',
  styleUrls: ['./start-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartLineComponent {
  private tetrisState = inject(TetrisStateService);

  hasCurrent = this.tetrisState.hasCurrent;
  clearedLines = this.tetrisState.clearedLines;
  initLine = this.tetrisState.initLine;
}
