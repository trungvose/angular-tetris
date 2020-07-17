import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TetrisService } from '@trungk18/state/tetris/tetris.service';

@Component({
  selector: 'angular-tetris',
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss']
})
export class AngularTetrisComponent implements OnInit {
  @Input() paused: boolean;
  constructor(private _tetris: TetrisService) {}

  ngOnInit(): void {}

  @HostListener('document:keydown.arrowleft')
  moveLeft() {
    this._tetris.moveLeft();
  }

  @HostListener('document:keydown.arrowright')
  moveRight() {
    this._tetris.moveRight();
  }

  @HostListener('document:keydown.arrowup')
  rotate() {
    this._tetris.rotate();
  }

  @HostListener('document:keydown.arrowdown')
  moveDown() {
    this._tetris.moveDown();
  }
}
