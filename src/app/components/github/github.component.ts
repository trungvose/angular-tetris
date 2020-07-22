import { Component, OnInit } from '@angular/core';

@Component({
  selector: 't-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  tweetAngularTetrisUrl =
    'https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=Awesome%20Tetris%20game%20built%20with%20Angular%2010%20and%20Akita%2C%20can%20you%20get%20999999%20points%3F&hashtags=angular,angulartetris,akita,typescript';

  constructor() {}

  ngOnInit(): void {}
}
