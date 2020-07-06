import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularTetrisComponent } from './containers/angular-tetris/angular-tetris.component';
import { KeyboardComponent } from './containers/keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularTetrisComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
