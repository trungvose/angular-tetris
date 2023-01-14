import { Component, Input } from '@angular/core';

@Component({
  selector: 't-twitter-button',
  standalone: true,
  templateUrl: './twitter-button.component.html',
  styleUrls: ['./twitter-button.component.scss']
})
export class TwitterButtonComponent {
  @Input() showIcon = true;
  @Input() url = '';
}
