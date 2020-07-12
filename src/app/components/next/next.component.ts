import { Component, OnInit } from '@angular/core';

@Component({
  selector: 't-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss'],
})
export class NextComponent implements OnInit {
  BLANK_NEXT = [new Array(4).fill(0), new Array(4).fill(0)];
  
  constructor() {}

  ngOnInit(): void {}
}
