import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[t-shared-button]', //eslint-disable-line
  standalone: true,
  imports: [NgIf],
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedButtonComponent {
  @HostBinding('class') className = 'twitter-button';
  @Input() showIcon = true;
}
