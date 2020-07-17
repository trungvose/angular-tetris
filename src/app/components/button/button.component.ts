import { Component, OnInit, Input } from '@angular/core';
import { ArrowButton, ArrowButtonTransform } from '@trungk18/interface/ui-model/arrow-button';
import { Observable } from 'rxjs';
@Component({
  selector: 't-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() className = '';
  @Input() isAbsolute = false;
  @Input() top: number;
  @Input() left: number;

  @Input() active$: Observable<boolean>;
  @Input() arrowButton: ArrowButton;

  get arrowTransforms() {
    return ArrowButtonTransform[this.arrowButton];
  }

  constructor() {}

  ngOnInit(): void {}
}
