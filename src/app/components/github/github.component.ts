import { Component, OnInit } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';
import { Observable } from 'rxjs';
import { GoogleAnalyticsService } from '@trungk18/services/google-analytics.service';
const HASHTAG = 'angular,angulartetris,akita,typescript';

@Component({
  selector: 't-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  max$: Observable<number>;
  //eslint-disable-next-line max-len
  tweetAngularTetrisUrl = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=Awesome%20Tetris%20game%20built%20with%20Angular%2010%20and%20Akita%2C%20can%20you%20get%20999999%20points%3F&hashtags=${HASHTAG}`;

  constructor(private _query: TetrisQuery, private _googleAnalytics: GoogleAnalyticsService) {}

  ngOnInit(): void {
    this.max$ = this._query.max$;
  }

  getTweetMaxScoreShareUrl(max: number) {
    const text = encodeURIComponent(
      `Woo-hoo! I got a ${max} points on Angular Tetris @tuantrungvo. Wanna join the party?`
    );
    return `https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=${text}&hashtags=${HASHTAG}`;
  }

  sendTwitterShareMaxScoreEvent() {
    this._googleAnalytics.sendEvent('Share Twitter High Score', 'button');
  }

  sendTwitterShareEvent() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
