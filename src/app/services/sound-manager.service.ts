import { Injectable } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris.query';

@Injectable({
  providedIn: 'root'
})
export class SoundManagerService {
  private _source: AudioBufferSourceNode;
  constructor(private _query: TetrisQuery) {
    this._loadSound();
  }

  private get _hasWebAudioAPI(): boolean {
    return !!AudioContext && location.protocol.indexOf('http') !== -1;
  }

  start() {
    this._playMusic(0, 3.7202, 3.6224);
  }

  clear() {
    this._playMusic(0, 0, 0.7675);
  }

  fall() {
    this._playMusic(0, 1.2558, 0.3546);
  }

  gameover() {
    this._playMusic(0, 8.1276, 1.1437);
  }

  rotate() {
    this._playMusic(0, 2.2471, 0.0807);
  }

  move() {
    this._playMusic(0, 2.9088, 0.1437);
  }

  private _playMusic(when: number, offset: number, duration: number) {
    if (!this._source || !this._query.isEnableSound) {
      return;
    }
    this._source.start(when, offset, duration);
  }

  private _loadSound() {
    if (!this._hasWebAudioAPI || !this._source) {
      return;
    }
    const url = '/assets/music.mp3';
    const context = new AudioContext();
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = () => {
      context.decodeAudioData(
        req.response,
        (buffer) => {
          this._source = context.createBufferSource();
          this._source.buffer = buffer;
          this._source.connect(context.destination);
        },
        () => {
          alert('Cannot play sound, but I hope you still enjoy Angular Tetris. Sorry lah!');
        }
      );
    };
    req.send();
  }
}
