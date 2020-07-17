import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TetrisKeyboard } from '@trungk18/interface/keyboard';
import { KeyboardService } from '@trungk18/state/keyboard/keyboard.service';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { TetrisService } from '@trungk18/state/tetris/tetris.service';
import { SoundManagerService } from '@trungk18/services/sound-manager.service';
import { timer, of } from 'rxjs';
import { delay } from 'rxjs/operators';
const KeyUp = 'document:keyup';
const KeyDown = 'document:keydown';
@Component({
  selector: 'angular-tetris',
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss']
})
export class AngularTetrisComponent implements OnInit {
  @Input() paused: boolean;
  constructor(
    private _tetrisService: TetrisService,
    private _tetrisQuery: TetrisQuery,
    private _keyboardService: KeyboardService,
    private _soundManager: SoundManagerService
  ) {}

  ngOnInit(): void {}

  keyboardMouseDown(key: string) {
    this[`keyDown${key}`]();
  }

  keyboardMouseUp(key: string) {
    this[`keyUp${key}`]();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Left}`)
  keyDownLeft() {
    this._soundManager.move();
    this._keyboardService.setKeỵ({
      left: true
    });
    this._tetrisService.moveLeft();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Left}`)
  keyUpLeft() {
    this._keyboardService.setKeỵ({
      left: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Right}`)
  keyDownRight() {
    this._soundManager.move();
    this._keyboardService.setKeỵ({
      right: true
    });
    this._tetrisService.moveRight();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Right}`)
  keyUpRight() {
    this._keyboardService.setKeỵ({
      right: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Up}`)
  keyDownUp() {
    this._soundManager.rotate();
    this._keyboardService.setKeỵ({
      up: true
    });
    this._tetrisService.rotate();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Up}`)
  keyUpUp() {
    this._keyboardService.setKeỵ({
      up: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Down}`)
  keyDownDown() {
    this._soundManager.move();
    this._keyboardService.setKeỵ({
      down: true
    });
    this._tetrisService.moveDown();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Down}`)
  keyUpDown() {
    this._keyboardService.setKeỵ({
      down: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Space}`)
  keyDownSpace() {
    this._keyboardService.setKeỵ({
      drop: true
    });
    if (this._tetrisQuery.isPlaying) {
      this._soundManager.fall();
      return;
    }
    this._soundManager.start();
    this._tetrisService.start();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Space}`)
  keyUpSpace() {
    this._keyboardService.setKeỵ({
      drop: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.S}`)
  keyDownSound() {
    this._soundManager.move();
    this._tetrisService.setSound();
    this._keyboardService.setKeỵ({
      sound: true
    });
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.S}`)
  keyUpSound() {
    this._keyboardService.setKeỵ({
      sound: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.P}`)
  keyDownPause() {
    this._soundManager.move();
    this._keyboardService.setKeỵ({
      pause: true
    });
    if (this._tetrisQuery.canStartGame) {
      this._tetrisService.start();
    } else {
      this._tetrisService.pause();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.P}`)
  keyUpPause() {
    this._keyboardService.setKeỵ({
      pause: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.R}`)
  keyDownReset() {
    this._soundManager.move();
    this._keyboardService.setKeỵ({
      reset: true
    });
    this._tetrisService.pause();
    setTimeout(() => {
      if (confirm('You are having a good game. Are you sure you want to reset?')) {
        this._tetrisService.reset();
      } else {
        this.keyUpReset();
        this._tetrisService.start();
      }
    });
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.R}`)
  keyUpReset() {
    this._keyboardService.setKeỵ({
      reset: false
    });
  }
}
