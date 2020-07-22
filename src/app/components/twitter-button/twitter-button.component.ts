import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 't-twitter-button',
  templateUrl: './twitter-button.component.html',
  styleUrls: ['./twitter-button.component.scss']
})
export class TwitterButtonComponent implements OnInit {
  @Input() tweetUrl = '';

  constructor() {}

  ngOnInit(): void {}
}
