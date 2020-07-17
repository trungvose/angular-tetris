import { Component, OnInit, Output } from '@angular/core';
import { ArrowButton } from '@trungk18/interface/ui-model/arrow-button';
import { KeyboardQuery } from '@trungk18/state/keyboard/keyboard.query';
import { EventEmitter } from 'events';

@Component({
  selector: 't-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  ArrowButton = ArrowButton;
  @Output() onMouseDown = new EventEmitter();
  @Output() onMouseUp = new EventEmitter();

  constructor(public keyboardQuery: KeyboardQuery) {}

  ngOnInit(): void {}
}
