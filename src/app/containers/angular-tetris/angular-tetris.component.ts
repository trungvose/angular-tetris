import { Component, OnInit } from '@angular/core';
import { TetrisService } from '@trungk18/state/tetris.service';

@Component({
  selector: 'angular-tetris',
  templateUrl: './angular-tetris.component.html',
  styleUrls: ['./angular-tetris.component.scss']
})
export class AngularTetrisComponent implements OnInit {
  constructor(private _service: TetrisService) {}

  ngOnInit(): void {
    this._service.startOver();
  }
}
