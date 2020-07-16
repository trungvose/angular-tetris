import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { Tile } from '@trungk18/interface/tile/tile';

@Component({
  selector: 't-tile',
  template: ``,
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  constructor(public el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.tile) {
      return;
    }

    if (this.tile.isFilled) {
      this._renderer.addClass(this.el.nativeElement, 'filled');
    }

    if (this.tile.isAnimated) {
      this._renderer.addClass(this.el.nativeElement, 'animated');
    }
  }
}
