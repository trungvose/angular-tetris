import { NgClass } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, Observable, timer } from 'rxjs';
import { delay, finalize, map, repeat, startWith, takeWhile, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 't-logo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  className = '';

  ngOnInit(): void {
    concat(this.run(), this.eyes())
      .pipe(delay(5000), repeat(1000), untilDestroyed(this))
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
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
      }),
      finalize(() => {
        this.className = `${side}1`;
        this.cdr.markForCheck();
      })
    );
  }
}
