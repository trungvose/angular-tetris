import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ArrowButton } from '@angular-tetris/interface/ui-model/arrow-button';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ButtonComponent } from '../button/button.component';
import { KeyboardStore } from '@angular-tetris/state/keyboard/keyboard.store';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';

@Component({
  selector: 't-keyboard',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Input() filling = 20;
  @Output() onMouseDown = new EventEmitter<string>();
  @Output() onMouseUp = new EventEmitter<string>();
  ArrowButton = ArrowButton;
  pauseButtonLabel$: Observable<string> = inject(TetrisStore).isPaused$.pipe(
    map((isPaused) => (isPaused ? 'Play' : 'Pause'))
  );
  keyboardStore = inject(KeyboardStore);

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();
    this.onMouseUp.emit(key);
  }
}
