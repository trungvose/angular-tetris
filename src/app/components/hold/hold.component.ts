import { Component, OnInit } from '@angular/core';
import { Tile, TileValue } from '@trungk18/interface/tile/tile';
import { TetrisService } from '@trungk18/state/tetris/tetris.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 't-hold',
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.scss']
})
export class HoldComponent implements OnInit {
  hold$: Observable<Tile[][]>;
  constructor(private _tetrisService: TetrisService) {}

  ngOnInit(): void {
    this.hold$ = this._tetrisService.hold$.pipe(
        map((piece) => piece.next.map((row) => row.map((value) => new Tile(value as TileValue))))
    );
  }
}
