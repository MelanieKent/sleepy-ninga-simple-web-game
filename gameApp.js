const Application = PIXI.Application;

var localServerName = 'http://127.0.0.1:5500';

var gameWidth = 1000;
var gameHeight = 500;
const app = new Application({
    width: gameWidth,
    height: gameHeight,
});

app.renderer.background.color = 0xffffff;

const Graphics = PIXI.Graphics;

//the whole game area in which the game is played
// const playArea = new Graphics();
// playArea.beginFill(0x00008B);
// playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
// playArea.endFill();
// playArea.position(200, 200);

// app.stage.addChild(playArea);

document.body.appendChild(app.view);


// const playerTexture = PIXI.Texture.from(localServerName + '//images/back.jpg');

// const playerSprite = new PIXI.Sprite(
//     playerTexture,
//     app.screen.width,
//     app.screen.height);

// app.stage.addChild(playerSprite);

// document.body.appendChild(playerSprite);

const backTexture = PIXI.Texture.from(localServerName + '//images/back.jpg');

const backSprite = new PIXI.TilingSprite(
    backTexture,
    app.screen.width,
    app.screen.height,
    );


backSprite.tileScale.set(0.5, 0.5);

app.ticker.add(function() {
    backSprite.tilePosition.x -= 0.5;
})


app.stage.addChild(backSprite);

document.body.appendChild(playerSprite);


// const backTexture = PIXI.Texture.from(localServerName + '//images/background.png');
// const backSprite = new PIXI.TilingSprite(backTexture,
//     app.screen.height);

// app.stage.addChild(backSprite);

