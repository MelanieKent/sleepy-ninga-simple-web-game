const Application = PIXI.Application;

//CONSTANTS
var localServerName = 'http://127.0.0.1:5500';
var gameWidth = 1200;
var gameHeight = 500;
var lineY = 365;

const app = new Application({
    width: gameWidth,
    height: gameHeight,
});

app.renderer.background.color = 0xFF1FFF;

const Graphics = PIXI.Graphics;

document.body.appendChild(app.view);



//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
playArea.endFill();

app.stage.addChild(playArea);

// bakcground
const backTexture = PIXI.Texture.from(localServerName + '//images/back.jpg');
const backSprite = new PIXI.TilingSprite(
    backTexture,
    app.screen.width,
    app.screen.height,
    );
backSprite.tileScale.set(0.5, 0.5);

// for the background frame
app.ticker.add(function() {
    backSprite.tilePosition.x -= 0.5;
})

app.stage.addChild(backSprite);

