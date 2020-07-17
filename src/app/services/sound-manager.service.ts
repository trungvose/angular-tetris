import { Injectable } from '@angular/core';
import { TetrisQuery } from '@trungk18/state/tetris/tetris.query';

const SoundFilePath = '/assets/tetris-sound.mp3';
@Injectable({
  providedIn: 'root'
})
export class SoundManagerService {
  private _context: AudioContext;
  private _buffer: AudioBuffer;

  constructor(private _query: TetrisQuery) {
    (window as any).tetrisSound = this;
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

  gameOver() {
    this._playMusic(0, 8.1276, 1.1437);
  }

  rotate() {
    this._playMusic(0, 2.2471, 0.0807);
  }

  move() {
    this._playMusic(0, 2.9088, 0.1437);
  }

  private _playMusic(when: number, offset: number, duration: number) {
    if (!this._query.isEnableSound) {
      return;
    }
    this._loadSound().then((source) => {
      source && source.start(when, offset, duration);
    });
  }

  private _loadSound(): Promise<AudioBufferSourceNode> {
    return new Promise((resolve, reject) => {
      if (!this._hasWebAudioAPI) {
        resolve(null);
        return;
      }
      if (this._context && this._buffer) {
        resolve(this._getSource(this._context, this._buffer));
        return;
      }
      const context = new AudioContext();
      const req = new XMLHttpRequest();
      req.open('GET', SoundFilePath, true);
      req.responseType = 'arraybuffer';

      req.onload = () => {
        context.decodeAudioData(
          req.response,
          (buffer) => {
            this._context = context;
            this._buffer = buffer;
            resolve(this._getSource(context, buffer));
          },
          () => {
            let msg = 'Sorry lah, cannot play sound. But I hope you still enjoy Angular Tetris!!';
            alert(msg);
            reject(msg);
          }
        );
      };
      req.send();
    });
  }

  private _getSource(context: AudioContext, buffer: AudioBuffer): AudioBufferSourceNode {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    return source;
  }
}
