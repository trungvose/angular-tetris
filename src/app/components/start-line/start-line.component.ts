import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NumberComponent } from '../number/number.component';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

@Component({
  selector: 't-start-line',
  standalone: true,
  imports: [NumberComponent, NgIf, AsyncPipe],
  templateUrl: './start-line.component.html',
  styleUrls: ['./start-line.component.scss']
})
export class StartLineComponent {
  store = inject(TetrisStore);
  hasCurrent$ = this.store.hasCurrent$;
  clearedLines$ = this.store.clearedLines$;
  initLine$ = this.store.initLine$;
}
