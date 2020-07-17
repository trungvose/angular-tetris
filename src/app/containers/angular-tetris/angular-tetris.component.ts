import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TetrisService } from '@trungk18/state/tetris/tetris.service';
import { TetrisKeyBoard } from '@trungk18/interface/keyboard';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';

@Component({
  selector: 'angular-tetris',
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss']
})
export class AngularTetrisComponent implements OnInit {
  @Input() paused: boolean;
  constructor(private _tetrisService: TetrisService, private _tetrisQuery: TetrisQuery) {}

  ngOnInit(): void {}

  @HostListener('document:keydown.arrowleft')
  moveLeft() {
    this._tetrisService.moveLeft();
  }

  @HostListener('document:keydown.arrowright')
  moveRight() {
    this._tetrisService.moveRight();
  }

  @HostListener('document:keydown.arrowup')
  rotate() {
    this._tetrisService.rotate();
  }

  @HostListener('document:keydown.arrowdown')
  moveDown() {
    this._tetrisService.moveDown();
  }

  @HostListener(`document:keydown.${TetrisKeyBoard.Space}`)
  space() {
    if (this._tetrisQuery.canStartGame) {
      this._tetrisService.start();
    }
  }
}
