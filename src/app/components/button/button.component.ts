import { ArrowButton, ArrowButtonTransform } from '@angular-tetris/interface/ui-model/arrow-button';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 't-button',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() className = '';
  @Input() isAbsolute = false;
  @Input() top: number;
  @Input() left: number;

  @Input() active: boolean;
  @Input() arrowButton: ArrowButton;

  get arrowTransforms() {
    return ArrowButtonTransform[this.arrowButton];
  }
}
