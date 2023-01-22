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
document.body.appendChild(playerSprite);



