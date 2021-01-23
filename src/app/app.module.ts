import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import * as Sentry from '@sentry/angular';

import { AppComponent } from './app.component';
import { AngularTetrisComponent } from './containers/angular-tetris/angular-tetris.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ButtonComponent } from './components/button/button.component';
import { ScreenDecorationComponent } from './components/screen-decoration/screen-decoration.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import { NumberComponent } from './components/number/number.component';
import { ClockComponent } from './components/clock/clock.component';
import { SoundComponent } from './components/sound/sound.component';
import { PauseComponent } from './components/pause/pause.component';
import { PointComponent } from './components/point/point.component';
import { NextComponent } from './components/next/next.component';
import { LevelComponent } from './components/level/level.component';
import { StartLineComponent } from './components/start-line/start-line.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TileComponent } from './components/tile/tile.component';
import { LogoComponent } from './components/logo/logo.component';
import { GithubComponent } from './components/github/github.component';
import { TwitterButtonComponent } from './components/twitter-button/twitter-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularTetrisComponent,
    KeyboardComponent,
    ButtonComponent,
    ScreenDecorationComponent,
    MatrixComponent,
    NumberComponent,
    ClockComponent,
    SoundComponent,
    PauseComponent,
    PointComponent,
    NextComponent,
    LevelComponent,
    StartLineComponent,
    TileComponent,
    LogoComponent,
    GithubComponent,
    TwitterButtonComponent,
  ],
  imports: [BrowserModule, AkitaNgDevtools.forRoot()],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
