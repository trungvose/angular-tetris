import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NumberComponent } from '../number/number.component';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

@Component({
  selector: 't-level',
  standalone: true,
  imports: [AsyncPipe, NgIf, NumberComponent],
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent {
  store = inject(TetrisStore);
  speed$ = this.store.speed$;
  hasCurrent$ = this.store.hasCurrent$;
  initSpeed$ = this.store.initSpeed$;
}
