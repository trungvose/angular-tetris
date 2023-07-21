import { AsyncPipe, NgIf } from '@angular/common';
import { Component, HostListener, OnInit, ElementRef, Renderer2, inject } from '@angular/core';
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
import { KeyboardStore } from '@angular-tetris/state/keyboard/keyboard.store';
import { TetrisService } from '@angular-tetris/state/tetris/tetris.service';
import { TetrisStore } from '@angular-tetris/state/tetris/tetris.store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
const KeyUp = 'document:keyup';
const KeyDown = 'document:keydown';
@Component({
  selector: 'angular-tetris', // eslint-disable-line @angular-eslint/component-selector
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
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
  styleUrls: ['./angular-tetris.component.scss']
})
export class AngularTetrisComponent implements OnInit {
  keyboardStore = inject(KeyboardStore);
  tetrisStore = inject(TetrisStore);
  drop$ = this.keyboardStore.drop$;
  isShowLogo$: Observable<boolean>;
  filling: number;

  constructor(
    private tetrisService: TetrisService,
    private soundManager: SoundManagerService,
    private el: ElementRef,
    private render: Renderer2
  ) {}

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
    this.keyboardStore.setLeftTrue();
    if (this.hasCurrent) {
      this.tetrisService.moveLeft();
    } else {
      this.tetrisService.decreaseLevel();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Left}`)
  keyUpLeft() {
    this.keyboardStore.setLeftFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Right}`)
  keyDownRight() {
    this.soundManager.move();
    this.keyboardStore.setRightTrue();
    if (this.hasCurrent) {
      this.tetrisService.moveRight();
    } else {
      this.tetrisService.increaseLevel();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Right}`)
  keyUpRight() {
    this.keyboardStore.setRightFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Up}`)
  keyDownUp() {
    this.soundManager.rotate();
    this.keyboardStore.setUpTrue();
    if (this.hasCurrent) {
      this.tetrisService.rotate();
    } else {
      this.tetrisService.increaseStartLine();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Up}`)
  keyUpUp() {
    this.keyboardStore.setUpFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Down}`)
  keyDownDown() {
    this.soundManager.move();
    this.keyboardStore.setDownTrue();
    if (this.hasCurrent) {
      this.tetrisService.moveDown();
    } else {
      this.tetrisService.decreaseStartLine();
    }
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.Down}`)
  keyUpDown() {
    this.keyboardStore.setDownFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.Space}`)
  keyDownSpace() {
    this.keyboardStore.setDropTrue();
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
    this.keyboardStore.setDropFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.C}`)
  keyDownHold() {
    this.soundManager.move();
    this.keyboardStore.setHoldTrue();
    this.tetrisService.holdPiece();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.C}`)
  keyUpHold() {
    this.keyboardStore.setHoldFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.S}`)
  keyDownSound() {
    this.soundManager.move();
    this.tetrisService.setSound();
    this.keyboardStore.setSoundTrue();
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.S}`)
  keyUpSound() {
    this.keyboardStore.setSoundFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.P}`)
  keyDownPause() {
    this.soundManager.move();
    this.keyboardStore.setPauseTrue();
    this.tetrisService.canStartGame$.pipe(take(1)).subscribe((canStart) => {
      if (canStart) {
        this.tetrisService.resume();
      } else {
        this.tetrisService.pause();
      }
    });
  }

  @HostListener(`${KeyUp}.${TetrisKeyboard.P}`)
  keyUpPause() {
    this.keyboardStore.setPauseFalse();
  }

  @HostListener(`${KeyDown}.${TetrisKeyboard.R}`)
  keyDownReset() {
    this.soundManager.move();
    this.keyboardStore.setResetTrue();
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
    this.keyboardStore.setResetFalse();
  }

  get hasCurrent() {
    return !!this.tetrisService.current;
  }

  ngOnInit(): void {
    this.isShowLogo$ = this.tetrisStore.isShowLogo$;
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
