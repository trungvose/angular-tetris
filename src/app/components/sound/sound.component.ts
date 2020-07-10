import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 't-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss'],
})
export class SoundComponent implements OnInit {
  muted$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
