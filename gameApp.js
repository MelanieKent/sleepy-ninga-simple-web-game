const Application = PIXI.Application;

var gameWidth = 1200;
var gameHeight = 500;
const app = new Application({
    width: gameWidth,
    height: gameHeight,
});

app.renderer.background.color = 0xFF1FFF;

const Graphics = PIXI.Graphics;

//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
playArea.endFill();
// playArea.position(200, 200);

app.stage.addChild(playArea);

document.body.appendChild(app.view);

