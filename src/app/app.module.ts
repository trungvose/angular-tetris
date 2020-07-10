import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularTetrisComponent } from './containers/angular-tetris/angular-tetris.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ButtonComponent } from './components/button/button.component';
import { ScreenDecorationComponent } from './components/screen-decoration/screen-decoration.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import { NumberComponent } from './components/number/number.component';
import { ClockComponent } from './components/clock/clock.component';

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
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
