import { GoogleAnalyticsService } from '@angular-tetris/services/google-analytics.service';
import { TetrisStateService } from '@angular-tetris/state/tetris/tetris.state';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SharedButtonComponent } from '../shared-button/shared-button.component';
const HASHTAG = 'angular,angulartetris,akita,typescript';

@Component({
  selector: 't-github',
  standalone: true,
  imports: [SharedButtonComponent, NgIf],
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubComponent {
  private tetrisState = inject(TetrisStateService);
  private googleAnalytics = inject(GoogleAnalyticsService);

  max = this.tetrisState.max;

  tweetMaxScoreShareUrl = computed(() => {
    const text = encodeURIComponent(
      `Woo-hoo! I got a ${this.max()} points on Angular Tetris @trungvose. Wanna join the party?`
    );
    return `https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=${text}&hashtags=${HASHTAG}`;
  });

  //eslint-disable-next-line max-len
  tweetAngularTetrisUrl = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=Awesome%20Tetris%20game%20built%20with%20Angular%2010%20and%20Akita%2C%20can%20you%20get%20999999%20points%3F&hashtags=${HASHTAG}`;

  sendTwitterShareMaxScoreEvent() {
    this.googleAnalytics.sendEvent('Share Twitter High Score', 'button');
  }

  sendTwitterShareEvent() {
    this.googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
