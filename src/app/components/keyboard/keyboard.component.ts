import { Component, OnInit } from '@angular/core';
import { ArrowButton } from '@trungk18/interface/ui-model/arrow-button';

@Component({
  selector: 't-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  ArrowButton = ArrowButton;
  constructor() {}

  ngOnInit(): void {}
}
