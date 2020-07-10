import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 't-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent implements OnInit {
  @Input() num: number = 0;
  @Input() length = 6;

  get nums(): string[] {
    let str = `${this.num}`;
    let emptyCount = this.length - str.length;
    return str.padStart(emptyCount, 'n').split('');
  }

  constructor() {}

  ngOnInit(): void {}
}
