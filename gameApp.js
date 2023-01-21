const Application = PIXI.Application;

const app = new Application({
    width: 1000,
    height: 1000,

});

app.renderer.background.color = 0x00008B;

const Graphics = PIXI.Graphics;

//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(0, 0, 1000, 1000);
playArea.endFill();

app.stage.addChild(playArea);

document.body.appendChild(app.view);

