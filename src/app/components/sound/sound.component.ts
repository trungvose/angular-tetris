import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { map } from 'rxjs/operators';

@Component({
  selector: 't-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  muted$: Observable<boolean>;

  constructor(private _query: TetrisQuery) {}

  ngOnInit(): void {
    this.muted$ = this._query.sound$.pipe(map((sound) => !sound));
  }
}
