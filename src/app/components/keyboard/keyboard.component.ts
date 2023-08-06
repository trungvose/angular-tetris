import { GameState } from '@angular-tetris/interface/game-state';
import { ArrowButton } from '@angular-tetris/interface/ui-model/arrow-button';
import { KeyboardService } from '@angular-tetris/state/keyboard/keyboard.service';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 't-keyboard',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent {
  private tetrisState = inject(TetrisStateService);
  keyboardService = inject(KeyboardService);

  @Input() filling = 20;
  @Output() onMouseDown = new EventEmitter<string>();
  @Output() onMouseUp = new EventEmitter<string>();
  ArrowButton = ArrowButton; //eslint-disable-line @typescript-eslint/naming-convention

  pauseButtonLabel = computed(() =>
    this.tetrisState.gameState() === GameState.Paused ? 'Play' : 'Pause'
  );

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();
    this.onMouseUp.emit(key);
  }
}
