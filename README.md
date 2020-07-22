# Angular Tetris

A childhood memory Tetris game built with Angular 10 and Akita.

## Working Game

Check out the **working game** -> https://tetris.trungk18.com

The game has sounds, wear your 🎧 or turn on your 🔊 for a better experience.

![A child-hood memory Tetris game built with Angular 10 and Akita][demo]

If you like my work, feel free to:

- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about Angular Tetris
- :star: this repository. And we will be happy together :)

Thanks a bunch for stopping by and supporting me!

[tweet]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=Awesome%20Tetris%20game%20built%20with%20Angular%2010%20and%20Akita%2C%20can%20you%20get%20999999%20points%3F&hashtags=angular,angulartetris,akita,typescript

## Why?

Tetris was the first game that my dad bought for me and It cost about 1$ US at that time. It didn't sound a lot today. But 20 years ago, 1$ can feed my family for at least a few days. Put it that way, with 1\$ you can buy 2 dozens eggs.
This is the only gaming "machine" that I ever had until my first computer arrived. I have never had a SNES or PS1 at home.

My Tetris was exactly in the same yellow color and it was so big, running on 2 AA battery. It is how it looks.

![Retro Tetris][tetris]

After showing my wife the [Tetris game built with Vue][vue]. She told me why didn't I build the same <u>Tetris with Angular</u>? And here you go.

> I designed the game to hold a maximum score of 999999 (one million minus one 😂) and I have never reached that very end. Please [tweet][tweetmax] your screenshot together with hashtag `#angulartetris` and tag my name as well `@tuantrungvo`.
>
> The **first five** amazing gamer that reached to 999999 points will receive a <u>free gift</u>

[tweetmax]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fangular-tetris&text=Woo-hoo!%20I%20got%20a%20999999%20points%20on%20Angular%20Tetris%20%40tuantrungvo.%20Wanna%20join%20the%20party%3F%20&hashtags=angular,angulartetris,akita,typescript

## Who is this for?

I built this game dedicated to:

- For anyone that grew up with Tetris as a part of your memory. It was my childhood memory and I hope you enjoy the game as well.
- For the Angular developer community, I have never really seen a game that built with Angular and that's my answer. Using Akita as the underlying state management helps me to see all of the data flow, it is great for debugging. I wanted to see more Angular game from you guys 💪💪💪

## How to play

### Before playing

- You can use both keyboard and mouse to play. But prefer to use <u>keyboard</u>
- Press arrow left and right to change the speed of the game **(1 - 6)**. The higher the number, the faster the piece will fall
- Press arrow up and down to change how many of lines have been filled before starting the game **(1 - 10)**
- Press `Space` to start the game
- Press `P` for pause/resume game
- Press `R` for resetting the game
- Press `S` for the turn on/off the sounds

### Playing game

- Press `Space` make the piece drop quickly
- Press `Arrow left` and `right` for moving left and right
- Press `Arrow up` to rotate the piece
- Press `Arrow down` to move a piece faster
- When clearing lines, you will receive a point - 100 points for 1 line, 300 points for 2 lines, 700 points for 3 lines, 1500 points for 4 lines
- The drop speed of the pieces increases with the number of rows eliminated (one level up for every 20 lines cleared)

## Techstack

I built it barely with Angular and Akita, no additional UI framework/library was required.

![Angular Tetris][techstack]

## Development Challenge

I got the inspiration from the same but different [Tetris game built with Vue][vue]. To not reinvented the wheel, I started to look at Vue code and thought it would be very identical to Angular. But later one, I realized a few catches:

- The Vue source code was written a few years ago with pure JS. I could find several problems that the compiler didn't tell you. Such as giving `parseInt` a number. It is still working though, but I don't like it.
- There was extensive use of `setTimeout` and `setInterval` for making animations. I rewrote all of the animation logic using RxJS. You will see the detail below.
- The brain of the game also used `setTimeout` for the game loop. It was not a problem, but I was having a <u>hard time</u> understanding the code on some essential elements: how to render the piece to the UI, how the calculation makes sense with XY axis. In the end, I changed all of the logic to a proper OOP way using TypeScript class, based on [@chrum/ngx-tetris][ngx-tetris].

### Tetris Core

It is the most important part of the game. As I am following the Vue source code, It is getting harder to understand what was the developer's intention. The Vue version inspired me but I think I have to write the core Tetris differently.

Take a look at the two blocks of code below which do the same rendering piece on the screen and you will understand what I am talking about. The left side was rewritten with Angular and TypeScript and the right side was the JS version.

![Angular Tetris][compare01]

I always think that your code must be written as you talk to people, without explaining a word. Otherwise, when someone comes in and reads your code and maintains it, they will be struggling.

> “ Code is like humor. When you have to explain it, it’s bad.” – Cory House

And let me emphasize it again, I didn't write the brain of the game from scratch. I adapted the well-written source by [@chrum/ngx-tetris][ngx-tetris] for Tetris core. I did refactor some parts to support Akita and wrote some new functionality as well.

### Akita state management + dev tool support

Although you don't dispatch any action, Akita will still do it undo the hood as the Update action. And you still can see the data with [Redux DevTools][redux-devtool]. Remember to put that option into your `AppModule`

```ts
imports: [BrowserModule, environment.production ? [] : AkitaNgDevtools.forRoot()];
```

I turn it on all the time on [tetris.trungk18.com][angular-tetris], you can open the DevTools and start seeing the data flow.

![Angular Tetris][akita-devtool]

> Note: opening the DevTools could reduce the performance of the game significantly. I recommended you turn it off when you want to archive a high score 🤓

### Web Audio API

There are many sound effects in the game such as when you press space, or left, right. In reality, all of the sounds were a reference to a single file [assets/tetris-sound.mp3][sounds].

I don't have much experience working with audio before but the Web Audio API looks very promising. You could do more with it.

- See the [official documentation][webaudio]
- See how I load the mp3 file and store it in [sound-manager.service.ts][sound-manager]

### Animation

I rewrote the animation with RxJS. See the comparison below for the simple dinosaurs running animation at the beginning of the game.

You could do a lot of stuff if you know RxJS well enough :) I think I need to strengthen my RxJS knowledge soon enough as well. Super powerful.

![Angular Tetris][compare02]

The actual result doesn't look very identical but it is good enough in my standard.

![Angular Tetris][compare02-result]

### Animation

I rewrote the animation with RxJS. See the comparison below for the simple dinosaurs running animation at the beginning of the game.

You could do a lot of stuff if you know RxJS well enough :) I think I need to strengthen my RxJS knowledge soon enough as well. Super powerful.

![Angular Tetris][compare02]

The actual result doesn't look very identical but it is good enough in my standard.

![Angular Tetris][compare02-result]

### Keyboard handling

I planned to use [@ngneat/hotkeys][hotkeys] but I decided to use `@HostListener` instead. A simple implementation could look like:

```typescript
@HostListener(`${KeyDown}.${TetrisKeyboard.Left}`)
keyDownLeft() {
  this._soundManager.move();
  this._keyboardService.setKeỵ({
    left: true
  });
  if (this.hasCurrent) {
    this._tetrisService.moveLeft();
  } else {
    this._tetrisService.decreaseLevel();
  }
}
```

See more at [containers/angular-tetris/angular-tetris.component.ts][hotkeys-implementation]

## Features and Roadmap

### Phase 1 - Angular Tetris basic functionality

> July 10 - 23, 2020

- [x] Proven, scalable, and easy to understand project structure
- [x] Basic Tetris functionality
- [x] Six levels
- [x] Local storage high score
- [x] Sounds effects

### Phase 2 - Firebase high score, more sounds effect, more animation

> TBD

- [ ] Firebase high score
- [ ] More sound effects
- [ ] More animations

## Time spending

I was still working with [Chau Tran][chautran] on phase two of [Angular Jira clone][jira-clone] when I saw that Tetris game built with Vue. My wife wanted to have a version that I built so that I decided to finish the Angular Tetris first before completing Jira clone phase two.

According to waka time report, I have spent about 30 hours working on this project. Which is equal to [run a marathon five times][marathon] at my current speed 😩

![Angular Tetris][timespending]

The flow was easy. I designed a simple [to do list][todolist], then start reading the code in Vue. And start working on the Angular at the same time. Halfway, I start to read [@chrum/ngx-tetris][ngx-tetris] instead of the Vue source. And keep building until I have the final result. 30 hours was a good number. It would take me longer, or lesser. But I enjoyed the experience working on the first-ever game I have built.

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/angular-tetris.git`
- `cd angular-tetris`
- `npm start`
- The app should run on `http://localhost:4200/`

## Author: Trung Vo ✍️

- A young and passionate front-end engineer. Working with Angular and TypeScript. Like photography, running, cooking, and reading books.
- Author of Angular Jira clone -> [jira.trungk18.com][jira-clone]
- Personal blog: https://trungk18.com/
- Say hello: trungk18 [et] gmail [dot] com

## Credits and references

| Resource                                      | Description                                                                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [@Binaryify/vue-tetris][vue]                  | Vue Tetris, I reused part of HTML, CSS and static assets from that project                                                               |
| [@chrum/ngx-tetris][ngx-tetris]               | A comprehensive core Tetris written with Angular, I reused part of that for the brain of the game.                                       |
| [Game Development: Tetris in Angular][medium] | A detailed excellent article about how to build a complete Tetris game. I didn't check the code but I learned much more from the article |
| [Super Rotation System][srs]                  | A standard for how the piece behaves. I didn't follow everything but it is good to know as wells                                         |

## Contributing

If you have any ideas, just [open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. [Pull requests][pull] are warmly welcome.

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[issues]: https://github.com/trungk18/angular-tetris/issues/new/choose
[pull]: https://github.com/trungk18/angular-tetris/pulls
[angular-tetris]: https://tetris.trungk18.com
[medium]: https://medium.com/angular-in-depth/game-development-tetris-in-angular-64ef96ce56f7
[srs]: https://tetris.fandom.com/wiki/SRS
[vue]: https://github.com/Binaryify/vue-tetris
[tetris]: src/assets/readme/retro-tetris.jpg
[ngx-tetris]: https://github.com/chrum/ngx-tetris
[techstack]: src/assets/readme/tech-stack.png
[compare01]: src/assets/readme/compare01.png
[compare02]: src/assets/readme/compare02.png
[compare02-result]: src/assets/readme/compare02-result.gif
[timespending]: src/assets/readme/time-spending.png
[akita-devtool]: src/assets/readme/akita-devtool.gif
[sounds]: src/assets/tetris-sound.mp3
[sound-manager]: src/app/services/sound-manager.service.ts
[webaudio]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[redux-devtool]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
[hotkeys]: https://github.com/ngneat/hotkeys
[hotkeys-implementation]: src/app/containers/angular-tetris/angular-tetris.component.ts
[chautran]: https://github.com/nartc
[jira-clone]: https://github.com/trungk18/jira-clone-angular
[marathon]: https://www.strava.com/activities/2902245728
[todolist]: https://www.notion.so/trungk18/Phase-1-be1ae0fbbf2c4c2fb92887e2218413db
