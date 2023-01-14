import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[t-shared-button]',//eslint-disable-line
  standalone: true,
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharedButtonComponent {
  @HostBinding('class') className = 'twitter-button';
  @Input() showIcon = true;
}
