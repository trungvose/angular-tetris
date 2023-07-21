import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { concat, timer } from 'rxjs';
import { map, repeat, startWith, takeWhile } from 'rxjs/operators';

@Component({
  selector: 't-logo',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  runningClass$ = timer(0, 100).pipe(
    startWith(0),
    takeWhile((t) => t < 40),
    map((t) => {
      const range = Math.ceil((t + 1) / 10);
      const side = range % 2 === 0 ? 'l' : 'r';
      const runningLegState = t % 2 === 1 ? 3 : 4;
      const legState = t === 39 ? 1 : runningLegState;
      return `${side}${legState}`;
    })
  );

  blinkingEyesClass$ = timer(0, 500).pipe(
    startWith(0),
    takeWhile((t) => t < 5),
    map((t) => `l${t % 2 === 1 ? 1 : 2}`)
  );

  restingClass$ = timer(5000).pipe(
    startWith(0),
    map(() => 'l2')
  );

  dragonClass$ = concat(this.runningClass$, this.blinkingEyesClass$, this.restingClass$).pipe(
    repeat(Infinity)
  );
}
