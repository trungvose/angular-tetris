import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: '[t-shared-button]', //eslint-disable-line
  standalone: true,
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class SharedButtonComponent {
  @HostBinding('class') className = 'twitter-button';
  @Input() showIcon = true;
}
