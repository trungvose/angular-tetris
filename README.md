# Angular Tetris

A child-hood memory Tetris game built with Angular 10 and Akita.

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

Tetris was the first game that my dad bought to me and It costed about $1 US at that time. It didn't sound a lot today. But 20 years ago, 1$ can feed my family for at least few days. Put it that way, with 1\$ you can buy 2 dozens of eggs.
This is the only one gaming "machine" that I ever had until my first computer arrived. I have never had a SNES or PS1 at home.

My Tetris was exactly in the same yellow color and it was so big, running on 2 AA battery. It is how it looks.

![Retro Tetris][tetris]

Why not build the same <u>Tetris with Angular</u>? And here you go.

> I designed the game to hold maximum score of 999999 (one million minus one 😂) and I have never reached to that very end.
>
> I will give <u>a free gift</u> for the **first five** amazing gamer. Please tweet your screenshot together with hashtag `angulartetris` and tag my name as well `@tuantrungvo`.

## Who is this for?

I built this game dedicated to:

- For anyone that grew up with Tetris as a part of your memory. It was definitely my childhood memory and I hope you enjoy the game as well.
- For Angular developer community, I have never really see a game that built with Angular and that's my answer. Using Akita as the underlying state management really helps me to see all of the data flow, it is great for debugging. I wanted to see more Angular game from you guys 💪💪💪

## How to play

### Before playing

- You can use both keyboard and mouse to play. But prefer to use <u>keyboard</u>
- Press arrow left and right to change the speed of the game **(1 - 6)**. The higher the number, the faster the piece will fall.
- Press arrow up and down to change how many of lines has been filled before starting the game **(1 - 10)**
- Press `Space` to start the game
- Press `P` for pause/resume game
- Press `R` for reset the game
- Press `S` for the turn on/off music

### Playing game

- Press `Space` make the piece drop quickly
- Press `Arrow left` and `right` for moving left and right
- Press `Arrow up` to rotate the piece
- Press `Arrow down` to move a piece faster

## Techstack

I built it barely with Angular and Akita, no additional UI framework/library was required.

![Angular Tetris][techstack]

## Development Challenge

I got the inspiration from the same same but different [Tetris game built with Vue][vue]. To not reinvented the wheel, I started to look at Vue code and thought it would be very identical to Angular. But later one, I realized a few catches:

- The Vue source code was written few years ago with pure JS. I could find several problems that the complier didn't tell you. Such as giving `parseInt` a number. It is still working though, but I don't really like it.
- There was an extensively uses of `setTimeout` and `setInterval` for making animations. I rewrote all of the animation logic using RxJS. You will see the detail below.
- The brain of the game also used `setTimeout` for the game loop. It was not a problem, but I was having a <u>hard time</u> understanding the code on some essential elements: how to render the piece to the UI, how the calculation make senses with xy axis. In the end, I changed all of the logic to a proper OOP way using TypeScript class, based on [@chrum/ngx-tetris][ngx-tetris].

## Credits and references

| Resource                                      | Description                                                                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [@Binaryify/vue-tetris][vue]                  | Vue Tetris, I reused part of HTML, CSS and static assets from that project                                                               |
| [@chrum/ngx-tetris][ngx-tetris]               | A comprehensive core Tetris written with Angular, I reused part of that for the brain of the game.                                       |
| [Game Development: Tetris in Angular][medium] | A detailed excellent article about how to built a complete Tetris game. I didn't check the code but I learned much more from the article |
| [Super Rotation System][srs]                  | A standard for how the piece behave. I didn't follow everything but it is good to know as wells                                          |

[medium]: https://medium.com/angular-in-depth/game-development-tetris-in-angular-64ef96ce56f7
[srs]: https://tetris.fandom.com/wiki/SRS
[vue]: https://github.com/Binaryify/vue-tetris
[tetris]: src/assets/img/retro-tetris.jpg
[ngx-tetris]: https://github.com/chrum/ngx-tetris
[techstack]: src/assets/img/tech-stack.png
