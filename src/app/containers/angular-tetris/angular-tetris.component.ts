import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-tetris',
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss'],
})
export class AngularTetrisComponent implements OnInit {
  @Input() paused: boolean;
  constructor() {}

  ngOnInit(): void {}
}
