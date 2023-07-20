import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameState } from '@angular-tetris/interface/game-state';
import { ArrowButton } from '@angular-tetris/interface/ui-model/arrow-button';
import { KeyboardQuery } from '@angular-tetris/state/keyboard/keyboard.query';
import { TetrisQuery } from '@angular-tetris/state/tetris/tetris.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ButtonComponent } from '../button/button.component';

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
  pauseButtonLabel$: Observable<string> = this.query.gameState$.pipe(
    map((state) => (state === GameState.Paused ? 'Play' : 'Pause'))
  );

  constructor(public keyboardQuery: KeyboardQuery, private query: TetrisQuery) {}

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();
    this.onMouseUp.emit(key);
  }
}
