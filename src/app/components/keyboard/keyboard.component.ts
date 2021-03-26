import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArrowButton } from '@trungk18/interface/ui-model/arrow-button';
import { KeyboardQuery } from '@trungk18/state/keyboard/keyboard.query';
import { GameState } from '@trungk18/interface/game-state';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 't-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Input() filling = 20;
  @Output() onMouseDown = new EventEmitter<string>();
  @Output() onMouseUp = new EventEmitter<string>();
  ArrowButton = ArrowButton;//eslint-disable-line @typescript-eslint/naming-convention
  pauseButtonLabel$: Observable<string>;

  constructor(public keyboardQuery: KeyboardQuery, private _query: TetrisQuery) { }

  ngOnInit(): void {
    this.pauseButtonLabel$ = this._query.gameState$.pipe(
      map(state => state === GameState.Paused ? 'Play' : 'Pause')
    );
  }

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();
    this.onMouseUp.emit(key);
  }
}
