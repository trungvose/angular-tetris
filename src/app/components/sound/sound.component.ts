import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TetrisQuery } from '@trungk18/state/tetris.query';

@Component({
  selector: 't-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  constructor(public query: TetrisQuery) {}

  ngOnInit(): void {}
}
