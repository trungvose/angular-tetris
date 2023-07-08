import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { delay, finalize, map, repeat, startWith, takeWhile, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 't-logo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  className = '';

  constructor() {
    concat(this.run(), this.eyes())
      .pipe(delay(5000), repeat(1000), takeUntilDestroyed())
      .subscribe();
  }

  eyes() {
    return timer(0, 500).pipe(
      startWith(0),
      map((x) => x + 1),
      takeWhile((x) => x < 6),
      tap((x) => {
        const state = x % 2 === 0 ? 1 : 2;
        this.className = `l${state}`;
      })
    );
  }

  run(): Observable<number> {
    let side = 'r';
    return timer(0, 100).pipe(
      startWith(0),
      map((x) => x + 1),
      takeWhile((x) => x <= 40),
      tap((x) => {
        if (x === 10 || x === 20 || x === 30) {
          side = side === 'r' ? 'l' : 'r';
        }
        const state = x % 2 === 0 ? 3 : 4;
        this.className = `${side}${state}`;
      }),
      finalize(() => {
        this.className = `${side}1`;
      })
    );
  }
}
