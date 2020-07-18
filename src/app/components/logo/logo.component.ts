import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { finalize, map, startWith, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 't-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  className: string = '';
  constructor() {}

  ngOnInit(): void {
    this.run().subscribe();
  }

  eyes() {
    return timer(0, 150).pipe(
      startWith(0),
      map((x) => x + 1),
      takeWhile((x) => x < 6),
      tap((x) => {
        let state = x % 2 === 0 ? 1 : 2;
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
        let state = x % 2 === 0 ? 3 : 4;
        this.className = `${side}${state}`;
      }),
      finalize(() => {
        this.className = `${side}1`;
      })
    );
  }
}
