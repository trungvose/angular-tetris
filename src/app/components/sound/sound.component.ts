import { AsyncPipe } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';

@Component({
  selector: 't-sound',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent {
  muted$$: Signal<boolean> = computed(() => !this.query.sound$$());

  constructor(private query: TetrisQuery) {}
}
