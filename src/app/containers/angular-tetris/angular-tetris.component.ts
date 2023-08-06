import { ClockComponent } from '@angular-tetris/components/clock/clock.component';
import { GithubComponent } from '@angular-tetris/components/github/github.component';
import { HoldComponent } from '@angular-tetris/components/hold/hold.component';
import { KeyboardComponent } from '@angular-tetris/components/keyboard/keyboard.component';
import { LevelComponent } from '@angular-tetris/components/level/level.component';
import { LogoComponent } from '@angular-tetris/components/logo/logo.component';
import { MatrixComponent } from '@angular-tetris/components/matrix/matrix.component';
import { NextComponent } from '@angular-tetris/components/next/next.component';
import { PauseComponent } from '@angular-tetris/components/pause/pause.component';
import { PointComponent } from '@angular-tetris/components/point/point.component';
import { ScreenDecorationComponent } from '@angular-tetris/components/screen-decoration/screen-decoration.component';
import { SoundComponent } from '@angular-tetris/components/sound/sound.component';
import { StartLineComponent } from '@angular-tetris/components/start-line/start-line.component';
import { TetrisKeyboard } from '@angular-tetris/interface/keyboard';
import { SoundManagerService } from '@angular-tetris/services/sound-manager.service';
import { KeyboardService } from '@angular-tetris/state/keyboard/keyboard.service';
import { TetrisService } from '@angular-tetris/state/tetris/tetris.service';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  inject
} from '@angular/core';

const KeyUp = 'document:keyup';
const KeyDown = 'document:keydown';
@Component({
  selector: 'angular-tetris', // eslint-disable-line @angular-eslint/component-selector
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ClockComponent,
    GithubComponent,
    HoldComponent,
    KeyboardComponent,
    LevelComponent,
    LogoComponent,
    MatrixComponent,
    NextComponent,
    PauseComponent,
    PointComponent,
    ScreenDecorationComponent,
    SoundComponent,
    StartLineComponent
  ],
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularTetrisComponent implements OnInit {
  private tetrisState = inject(TetrisStateService);
  private tetrisService = inject(TetrisService);
  private keyboardService = inject(KeyboardService);
  private soundManager = inject(SoundManagerService);
  private el = inject(ElementRef);
  private render = inject(Renderer2);

  drop = this.keyboardService.drop;
  isShowLogo$ = this.tetrisState.isShowLogo$;
  filling: number;

  @HostListener('window:resize', ['$event'])
  resize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const ratio = height / width;
    let scale = 1;
    if (ratio < 1.5) {
      scale = height / 960;
    } else {
      scale = width / 640;
      this.filling = (height - 960 * scale) / scale / 3;
      const paddingTop = Math.floor(this.filling) + 42;
      const paddingBottom = Math.floor(this.filling);
      const marginTop = Math.floor(-480 - this.filling * 1.5);
      this.setPaddingMargin(paddingTop, paddingBottom, marginTop);
    }
    this.render.setStyle(this.el.nativeElement, 'transform', `scale(${scale - 0.01})`);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (this.hasCurrent) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Left}`)
  keyDownLeft() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      left: true
    });
    if (this.hasCurrent) {
      this.tetrisService.moveLeft();
    } else {
      this.tetrisService.decreaseLevel();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Left}`)
  keyUpLeft() {
    this.keyboardService.setKeỵ({
      left: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Right}`)
  keyDownRight() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      right: true
    });
    if (this.hasCurrent) {
      this.tetrisService.moveRight();
    } else {
      this.tetrisService.increaseLevel();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Right}`)
  keyUpRight() {
    this.keyboardService.setKeỵ({
      right: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Up}`)
  keyDownUp() {
    this.soundManager.rotate();
    this.keyboardService.setKeỵ({
      up: true
    });
    if (this.hasCurrent) {
      this.tetrisService.rotate();
    } else {
      this.tetrisService.increaseStartLine();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Up}`)
  keyUpUp() {
    this.keyboardService.setKeỵ({
      up: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Down}`)
  keyDownDown() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      down: true
    });
    if (this.hasCurrent) {
      this.tetrisService.moveDown();
    } else {
      this.tetrisService.decreaseStartLine();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Down}`)
  keyUpDown() {
    this.keyboardService.setKeỵ({
      down: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Space}`)
  keyDownSpace() {
    this.keyboardService.setKeỵ({
      drop: true
    });
    if (this.hasCurrent) {
      this.soundManager.fall();
      this.tetrisService.drop();
      return;
    }
    this.soundManager.start();
    this.tetrisService.start();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Space}`)
  keyUpSpace() {
    this.keyboardService.setKeỵ({
      drop: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.C}`)
  keyDownHold() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      hold: true
    });
    this.tetrisService.holdPiece();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.C}`)
  keyUpHold() {
    this.keyboardService.setKeỵ({
      hold: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.S}`)
  keyDownSound() {
    this.soundManager.move();
    this.tetrisService.toggleSound();
    this.keyboardService.setKeỵ({
      sound: true
    });
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.S}`)
  keyUpSound() {
    this.keyboardService.setKeỵ({
      sound: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.P}`)
  keyDownPause() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      pause: true
    });
    if (this.tetrisState.canStartGame()) {
      this.tetrisService.resume();
    } else {
      this.tetrisService.pause();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.P}`)
  keyUpPause() {
    this.keyboardService.setKeỵ({
      pause: false
    });
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.R}`)
  keyDownReset() {
    this.soundManager.move();
    this.keyboardService.setKeỵ({
      reset: true
    });
    this.tetrisService.pause();
    setTimeout(() => {
      if (confirm('You are having a good game. Are you sure you want to reset?')) {
        this.tetrisService.reset();
      } else {
        this.tetrisService.resume();
      }
      this.keyUpReset();
    });
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.R}`)
  keyUpReset() {
    this.keyboardService.setKeỵ({
      reset: false
    });
  }

  get hasCurrent() {
    return this.tetrisState.hasCurrent();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.resize();
    });
  }

  keyboardMouseDown(key: string) {
    this[`keyDown${key}`]();
  }

  keyboardMouseUp(key: string) {
    this[`keyUp${key}`]();
  }

  private setPaddingMargin(paddingTop: number, paddingBottom: number, marginTop: number) {
    this.render.setStyle(this.el.nativeElement, 'padding-top', `${paddingTop}px`);
    this.render.setStyle(this.el.nativeElement, 'padding-bottom', `${paddingBottom}px`);
    this.render.setStyle(this.el.nativeElement, 'margin-top', `${marginTop}px`);
  }
}
