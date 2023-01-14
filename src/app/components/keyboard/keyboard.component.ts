import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameState } from '@trungk18/interface/game-state';
import { ArrowButton } from '@trungk18/interface/ui-model/arrow-button';
import { KeyboardQuery } from '@trungk18/state/keyboard/keyboard.query';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
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
  ArrowButton = ArrowButton; //eslint-disable-line @typescript-eslint/naming-convention
  pauseButtonLabel$: Observable<string> = this._query.gameState$.pipe(
    map((state) => (state === GameState.Paused ? 'Play' : 'Pause'))
  );

  constructor(public keyboardQuery: KeyboardQuery, private _query: TetrisQuery) {}

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();
    this.onMouseUp.emit(key);
  }
}
