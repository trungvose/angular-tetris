import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

@Component({
  selector: 't-sound',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent {
  muted$ = inject(TetrisStore).muted$;
}
