import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { concat, timer } from 'rxjs';
import { delay, map, repeat, startWith, takeWhile, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 't-logo',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  blinkingEyesClass$ = timer(0, 500).pipe(
    startWith(0),
    map((x) => x + 1),
    takeWhile((x) => x < 6),
    map((x) => `l${x % 2 === 0 ? 1 : 2}`)
  );

  runningClass$ = timer(0, 100).pipe(
    startWith(0),
    map((x) => x + 1),
    takeWhile((x) => x <= 40),
    map((x) => {
      const range = Math.ceil(x / 10);
      const side = range % 2 === 0 ? 'l' : 'r';
      const runningLegState = x % 2 === 0 ? 3 : 4;
      const legState = x === 40 ? 1 : runningLegState;
      return `${side}${legState}`;
    })
  );

  dragonNgClass$ = concat(this.blinkingEyesClass$, this.runningClass$).pipe(
    delay(5000),
    repeat(1000),
    map((className) => ['bg dragon', className])
  );
}
