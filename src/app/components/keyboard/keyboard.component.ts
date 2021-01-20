import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArrowButton } from '@trungk18/interface/ui-model/arrow-button';
import { KeyboardQuery } from '@trungk18/state/keyboard/keyboard.query';

@Component({
  selector: 't-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  ArrowButton = ArrowButton;
  @Input() filling: number = 20;
  @Output() onMouseDown = new EventEmitter<string>();
  @Output() onMouseUp = new EventEmitter<string>();

  constructor(public keyboardQuery: KeyboardQuery) { }

  ngOnInit(): void { }

  mouseDown(e: Event, key: string) {
    e.preventDefault();
    this.onMouseDown.emit(key);
  }

  mouseUp(e: Event, key: string) {
    e.preventDefault();    
    this.onMouseUp.emit(key);
  }
}
